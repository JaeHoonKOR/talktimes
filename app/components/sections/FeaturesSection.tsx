"use client";

import { Line, Sphere } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// 3D 뉴스 직배송 그래픽 컴포넌트
const NewsDeliveryGraphic = ({ scrollY }: { scrollY: number }) => {
  const { viewport } = useThree();
  const graphRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const connectionsRef = useRef<THREE.Group>(null);
  const flowParticlesRef = useRef<THREE.Group>(null);
  
  // 스크롤에 따른 효과
  useFrame(() => {
    if (graphRef.current) {
      // 스크롤에 따라 그래프 위치 조정 - 히어로 섹션과 연결되도록
      const scrollOffset = Math.max(scrollY - 200, 0); // 200px 이후부터 효과 시작
      const targetY = 0.5 + scrollOffset * 0.001;
      graphRef.current.position.y = THREE.MathUtils.lerp(
        graphRef.current.position.y || 0.5,
        targetY,
        0.05
      );
      
      // 스크롤에 따라 그래프 회전
      graphRef.current.rotation.y = THREE.MathUtils.lerp(
        graphRef.current.rotation.y,
        Math.PI * 0.05 + Math.sin(Date.now() * 0.0002) * 0.03,
        0.02
      );
      
      // 그래프 숨쉬는 효과 - 부드럽게
      const scale = 1 + Math.sin(Date.now() * 0.0005) * 0.02;
      graphRef.current.scale.set(scale, scale, scale);
    }
    
    // 노드들 움직임 - 최적화
    if (nodesRef.current) {
      const time = Date.now() * 0.001;
      nodesRef.current.children.forEach((node, i) => {
        if (i % 2 === 0) { // 절반의 노드만 움직임 (성능 향상)
          const mesh = node as THREE.Mesh;
          const offset = i * 0.2;
          
          // 각 노드마다 약간의 움직임
          mesh.position.y += Math.sin(time + offset) * 0.0003;
          mesh.position.x += Math.sin(time * 0.8 + offset) * 0.0002;
        }
      });
    }
    
    // 데이터 흐름 파티클 움직임 - 최적화
    if (flowParticlesRef.current && flowParticlesRef.current.children.length > 0) {
      flowParticlesRef.current.children.forEach((particle, i) => {
        if (i % 4 === 0 || i % 4 === 1) { // 일부 파티클만 업데이트 (성능 향상)
          const mesh = particle as THREE.Mesh;
          // 파티클의 진행 방향에 따라 위치 업데이트
          const pathProgress = (Date.now() * 0.0005 + i * 0.1) % 1;
          
          // 각 파티클이 특정 경로를 따라 이동
          const pathIdx = i % 4;
          if (pathIdx === 0) {
            // 상단 뉴스 소스에서 중앙으로
            mesh.position.set(
              THREE.MathUtils.lerp(-1.8, 0, pathProgress),
              THREE.MathUtils.lerp(1.5, 0, pathProgress),
              THREE.MathUtils.lerp(0.3, 0, pathProgress)
            );
          } else if (pathIdx === 1) {
            // 왼쪽 뉴스 소스에서 중앙으로
            mesh.position.set(
              THREE.MathUtils.lerp(-2.2, 0, pathProgress),
              THREE.MathUtils.lerp(-0.6, 0, pathProgress),
              THREE.MathUtils.lerp(0.4, 0, pathProgress)
            );
          } else if (pathIdx === 2) {
            // 오른쪽 뉴스 소스에서 중앙으로
            mesh.position.set(
              THREE.MathUtils.lerp(2.0, 0, pathProgress),
              THREE.MathUtils.lerp(0.9, 0, pathProgress),
              THREE.MathUtils.lerp(-0.4, 0, pathProgress)
            );
          } else {
            // 추가 소스에서 중앙으로
            mesh.position.set(
              THREE.MathUtils.lerp(0.8, 0, pathProgress),
              THREE.MathUtils.lerp(1.8, 0, pathProgress),
              THREE.MathUtils.lerp(-0.5, 0, pathProgress)
            );
          }
          
          // 중앙 처리 후 사용자에게 배포되는 효과 - 간소화
          if (pathProgress > 0.5 && i % 8 === 0) {
            // 중앙에서 사용자 노드로 이동 (일부만 처리)
            const userNodeIdx = i % 2;
            mesh.position.set(
              THREE.MathUtils.lerp(0, userNodeIdx === 0 ? -1.2 : 1.2, (pathProgress - 0.5) * 2),
              THREE.MathUtils.lerp(0, -1.5, (pathProgress - 0.5) * 2),
              THREE.MathUtils.lerp(0, 0.2, (pathProgress - 0.5) * 2)
            );
          }
          
          // 파티클 크기 효과 - 간소화
          const scale = pathProgress > 0.45 && pathProgress < 0.55 ? 0.05 : 0.03;
          mesh.scale.set(scale, scale, scale);
        }
      });
    }
  });
  
  // 미리 계산된 노드와 연결 정보를 사용
  // 뉴스 직배송 네트워크 구조 생성 - 사전 계산으로 최적화
  const createNewsDeliveryNetwork = () => {
    // 뉴스 소스 노드 위치 (최적화)
    const sourcePositions: [number, number, number][] = [
      [-1.8, 1.5, 0.3],    // 상단 소스 노드 (주요 뉴스 소스)
      [-2.2, -0.6, 0.4],   // 왼쪽 소스 노드 (지역 뉴스)
      [2.0, 0.9, -0.4],    // 오른쪽 소스 노드 (전문 뉴스)
      [0.8, 1.8, -0.5],    // 추가 소스 노드 (소셜 미디어)
    ];
    
    // 뉴스 처리 및 배포 노드 위치
    const processingPositions: [number, number, number][] = [
      [0, 0, 0],            // 중앙 처리 노드 (AI 큐레이션)
      [-1.2, -1.5, 0.2],    // 사용자 노드 1
      [1.2, -1.5, 0.2],     // 사용자 노드 2
    ];
    
    // 모든 노드 위치 통합
    const allPositions = [...sourcePositions, ...processingPositions];
    
    // 노드 간 연결 정의 (소스 -> 처리 -> 배포)
    const connectionPairs: [number, number][] = [
      [0, 4], [1, 4], [2, 4], [3, 4],  // 소스에서 중앙 처리 노드로
      [4, 5], [4, 6],                  // 중앙 처리 노드에서 사용자 노드로
    ];
    
    // 데이터 흐름 파티클 - 갯수 최적화
    const particles = [];
    for (let i = 0; i < 12; i++) { // 16에서 12로 감소
      particles.push({
        position: [0, 0, 0],
        pathIndex: i % 4
      });
    }
    
    return (
      <group ref={graphRef} position={[0, 0.5, 0]} rotation={[0, Math.PI * 0.3, 0]}>
        {/* 노드 그룹 */}
        <group ref={nodesRef}>
          {allPositions.map((pos, i) => (
            <Sphere key={i} args={[i === 4 ? 0.15 : (i > 4 ? 0.08 : 0.07), 8, 8]} position={pos}>
              <meshBasicMaterial 
                color={i === 4 ? "#00A8A8" : (i < 4 ? "#555555" : "#0088A8")} 
                opacity={0.8} 
                transparent 
              />
            </Sphere>
          ))}
        </group>
        
        {/* 연결선 그룹 */}
        <group ref={connectionsRef}>
          {connectionPairs.map(([from, to], i) => (
            <Line
              key={i}
              points={[
                allPositions[from],
                allPositions[to]
              ]}
              color={to === 4 ? "#555555" : "#00A8A8"}
              lineWidth={0.6}
              opacity={0.7}
              transparent
            />
          ))}
        </group>
        
        {/* 데이터 흐름 파티클 */}
        <group ref={flowParticlesRef}>
          {particles.map((_, i) => (
            <Sphere key={i} args={[0.03, 4, 4]} position={[0, 0, 0]}>
              <meshBasicMaterial color="#00A8A8" opacity={0.9} transparent />
            </Sphere>
          ))}
        </group>
      </group>
    );
  };
  
  return createNewsDeliveryNetwork();
};

// 3D 씬 컴포넌트 - 최적화
const Scene = ({ scrollY }: { scrollY: number }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <NewsDeliveryGraphic scrollY={scrollY} />
    </>
  );
};

export default function FeaturesSection({ 
  className = '', 
  id = 'features',
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  
  // 스크롤 관련 모션 값
  const { scrollY } = useScroll();
  const sectionOffset = useTransform(scrollY, value => value - (sectionRef.current?.offsetTop || 0));
  const opacity = useTransform(sectionOffset, [-300, 0, 500], [0, 1, 0.8]);
  const y = useTransform(sectionOffset, [-300, 0, 500], [50, 0, 50]);
  
  // 스크롤 값 상태 관리 - 최적화
  const [scrollYValue, setScrollYValue] = useState(0);
  
  useEffect(() => {
    // 스크롤 값 업데이트 빈도 최적화
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollYValue(scrollY.get());
      });
    };
    
    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [scrollY]);
  
  // 애니메이션을 부드럽게 하는 스프링 효과
  const smoothY = useSpring(y, { 
    damping: 20, 
    stiffness: 60,
    mass: 1
  });
  
  const smoothOpacity = useSpring(opacity, { 
    damping: 20, 
    stiffness: 60,
    mass: 1
  });
  
  // 페이지 로드 후 애니메이션 시작 - 지연 시간 최소화
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // 애니메이션 변형 - 간소화
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
        delayChildren: 0.05,
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  // 특징 아이템 데이터
  const features = [
    {
      title: "실시간 뉴스 수집",
      description: "전 세계 신뢰할 수 있는 뉴스 소스로부터 24시간 실시간으로 최신 정보를 수집합니다.",
      icon: "/icons/realtime.svg",
    },
    {
      title: "AI 기반 큐레이션",
      description: "사용자의 관심사와 읽기 패턴을 분석하여 정보 과부하 없이 가장 관련성 높은 콘텐츠만 엄선합니다.",
      icon: "/icons/curate.svg",
    },
    {
      title: "심층 분석 제공",
      description: "표면적 정보를 넘어 복잡한 주제에 대한 맥락과 심층적 이해를 제공하는 분석을 함께 전달합니다.",
      icon: "/icons/analysis.svg",
    },
    {
      title: "맞춤형 직배송",
      description: "선호하는 시간과 플랫폼으로 개인화된 뉴스를 직배송하여 언제 어디서나 중요한 정보를 놓치지 않습니다.",
      icon: "/icons/cross-platform.svg",
    }
  ];

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`min-h-screen w-full flex items-center justify-center relative bg-[#F9FAFB] dark:bg-[#1C1C1E] text-[#121212] dark:text-[#F0F0F0] overflow-hidden ${className}`}
      aria-label="서비스 주요 특징 소개"
    >
      {/* 3D 배경 - 히어로 섹션과 연결 */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        ref={canvasRef}
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]} // 성능 최적화
          performance={{ min: 0.5 }} // 성능 최적화
        >
          <Scene scrollY={scrollYValue} />
        </Canvas>
      </div>
      
      {/* 메인 콘텐츠 */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
        style={{
          y: prefersReducedMotion ? 0 : smoothY,
          opacity: smoothOpacity
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col items-center text-center mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView && isLoaded ? "visible" : "hidden"}
          >
            {/* 섹션 제목 */}
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-black"
            >
              뉴스 직배송 서비스
            </motion.h2>
            
            {/* 섹션 설명 */}
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed"
            >
              AI 기술로 중요한 뉴스만 선별하여 실시간으로 수집하고 당신에게 바로 전달합니다.
            </motion.p>
          </motion.div>
          
          {/* 특징 그리드 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView && isLoaded ? "visible" : "hidden"}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#EFEFEF] dark:bg-[#2C2C2E]">
                      <Image 
                        src={feature.icon} 
                        alt={feature.title} 
                        width={24} 
                        height={24}
                        className="w-6 h-6"
                        priority={i < 2} // 처음 두 아이콘은 우선 로드
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 