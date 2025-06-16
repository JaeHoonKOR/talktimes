// "use client";

// // React Three Fiber를 위한 3D 라이브러리 imports
// import { Environment, RoundedBoxGeometry } from '@react-three/drei'; // 3D 환경 설정과 둥근 박스 지오메트리
// import { Canvas, useFrame } from '@react-three/fiber'; // 3D 캔버스와 애니메이션 프레임 훅
// import { motion, useReducedMotion } from 'framer-motion'; // 페이지 애니메이션 라이브러리
// import Link from 'next/link'; // Next.js 라우팅을 위한 Link 컴포넌트
// import { useEffect, useRef, useState } from 'react'; // React 기본 훅들
// import * as THREE from 'three'; // Three.js 3D 라이브러리

// // 둥근 모서리 박스 컴포넌트 (재사용 가능한 3D 박스)
// function RoundedBox({ 
//   args, 
//   radius = 0.1, 
//   position = [0, 0, 0] as [number, number, number], 
//   children, 
//   ...props 
// }: { 
//   args: [number, number, number]; // 박스 크기 [가로, 세로, 깊이]
//   radius?: number; // 모서리 둥글기 정도 (기본값 0.1)
//   position?: [number, number, number]; // 박스 위치 [x, y, z] (기본값 중앙)
//   children?: React.ReactNode; // 자식 요소들 (주로 재질)
//   [key: string]: any; // 기타 추가 속성들
// }) {
//   return (
//     <mesh position={position} {...props}>
//       {/* 3D 메쉬 객체, position으로 위치 설정 */}
//       <RoundedBoxGeometry 
//         args={args} 
//         radius={radius} 
//         smoothness={8}
//       />
//       {/* 둥근 모서리를 가진 박스 모양, 박스 크기, 모서리 둥글기, 부드러움 정도 */}
//       {children}
//       {/* 자식 요소들 렌더링 (주로 meshPhysicalMaterial) */}
//     </mesh>
//   );
// }

// // 아이폰 메탈 프레임 컴포넌트
// function PhoneFrame() {
//   // 박스 크기: 가로66cm, 세로138cm, 두께8cm
//   // 모서리 둥글기: 6.8cm (아이폰 특유의 둥근 모서리)
//   // 위치: 화면 중앙 [x중앙, y중앙, z중앙]
//   return (
//     <RoundedBox
//       args={[0.66, 1.38, 0.08]} 
//       radius={0.068} 
//       position={[0, 0, 0]} 
//     >
//       {/* 물리적 재질 (빛 반사, 메탈릭 효과 등) */}
//       {/* 색상: 실버 메탈 (#c0c0c0 = RGB 192,192,192) */}
//       {/* 메탈릭 정도: 1.0 = 완전한 메탈, 0 = 플라스틱 */}
//       {/* 표면 거칠기: 0.02 = 매우 매끄러운 금속 표면 */}
//       <meshPhysicalMaterial
//         color="#c0c0c0"
//         metalness={1.0}
//         roughness={0.02}
//       />
//       </RoundedBox>
//   );
// }

// // 아이폰 화면 컴포넌트
// function PhoneScreen() {
//   // 박스 크기: 가로58cm, 세로130cm, 두께7.5cm
//   // 모서리 둥글기: 5.5cm (프레임보다 살짝 작게)
//   // 위치: 프레임 안쪽에 들어가도록 z축으로 0.0025 앞으로
//   return (
//     <RoundedBox
//       args={[0.58, 1.30, 0.075]} 
//       radius={0.055} 
//       position={[0, 0, 0.0025]} 
//     >
//       {/* 화면용 물리적 재질 */}
//       {/* 색상: 어두운 회색 (꺼진 화면 느낌) */}
//       {/* 메탈릭: 0.1 = 거의 없음 (유리/플라스틱 느낌) */}
//       {/* 표면 거칠기: 0.01 = 매우 매끄러운 유리 화면 */}
//       <meshPhysicalMaterial
//         color="#1a1a1a"
//         metalness={0.1}
//         roughness={0.01}
//       />
//     </RoundedBox>
//   );
// }

// // 홈 인디케이터 컴포넌트 (아이폰 하단의 작은 막대)
// function HomeIndicator() {
//   // 박스 크기: 가로12cm, 세로1.2cm, 두께0.1cm (얇은 막대 모양)
//   // 모서리 둥글기: 0.6cm (작은 반원 형태)
//   // 위치: 중앙, 위쪽으로 60cm, 화면 표면 위로 4.1cm
//   return (
//     <RoundedBox 
//       args={[0.12, 0.012, 0.001]} 
//       radius={0.006} 
//       position={[0, 0.6, 0.041]} 
//     >
//       {/* 홈 인디케이터용 재질 */}
//       {/* 색상: 중간 회색 (#888888 = RGB 136,136,136) */}
//       {/* 메탈릭: 0.2 = 약간의 메탈릭 (플라스틱에 가까움) */}
//       {/* 표면 거칠기: 0.1 = 약간 거친 표면 */}
//       <meshPhysicalMaterial
//         color="#888888"
//         metalness={0.2}
//         roughness={0.1}
//       />
//     </RoundedBox>
//   );
// }

// // 정적인 메신저 인터페이스 (화면에 표시되는 UI)
// function MessengerInterface() {
//   // 그룹 위치: 화면 표면 위로 4.1cm
//   // 그룹 크기: x축 90%, y축 90%, z축 100%
//   return (
//     <group
//       position={[0, 0, 0.041]} 
//       scale={[0.9, 0.9, 1]} 
//     >
//       {/* 메신저 배경 */}
//       {/* 3D 메쉬 객체 */}
//       <mesh>
//         {/* 평면 도형: 가로 60cm, 세로 120cm */}
//         <planeGeometry args={[0.6, 1.2]} />
//         {/* 표준 재질 (기본적인 빛 반사) */}
//         {/* 색상: 매우 밝은 회색 (배경색) */}
//         {/* 투명도 활성화 */}
//         {/* 불투명도: 95% (5% 투명) */}
//         <meshStandardMaterial
//           color="#f8fafc"
//           transparent
//           opacity={0.95}
//         />
//       </mesh>

//       {/* 상단 헤더 */}
//       {/* 위치: 중앙, 위쪽으로 55cm, 앞으로 0.1cm */}
//       <mesh position={[0, 0.55, 0.001]}>
//         {/* 평면 크기: 가로 60cm, 세로 8cm */}
//         <planeGeometry args={[0.6, 0.08]} />
//         {/* 표준 재질 */}
//         {/* 색상: 흰색 */}
//         {/* 투명도 활성화 */}
//         {/* 불투명도: 90% */}
//         <meshStandardMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.9}
//           />
//       </mesh>

//       {/* 메시지 버블 1 (받은 메시지) */}
//       <mesh position={[-0.15, 0.3, 0.002]}> {/* 위치: 왼쪽으로 15cm, 위쪽으로 30cm, 앞으로 0.2cm */}
//         <planeGeometry args={[0.25, 0.06]} /> {/* 평면 크기: 가로 25cm, 세로 6cm */}
//         <meshStandardMaterial  {/* 표준 재질 */}
//           color="#e5e7eb" {/* 색상: 밝은 회색 (받은 메시지 색상) */}
//           transparent  {/* 투명도 활성화 */}
//           opacity={0.8} {/* 불투명도: 80% */}
//           />
//       </mesh>

//       {/* 메시지 버블 2 (보낸 메시지) */}
//       <mesh position={[0.15, 0.2, 0.002]}> {/* 위치: 오른쪽으로 15cm, 위쪽으로 20cm, 앞으로 0.2cm */}
//         <planeGeometry args={[0.22, 0.05]} /> {/* 평면 크기: 가로 22cm, 세로 5cm */}
//         <meshStandardMaterial  {/* 표준 재질 */}
//           color="#3b82f6" {/* 색상: 파란색 (보낸 메시지 색상) */}
//           transparent  {/* 투명도 활성화 */}
//           opacity={0.8} {/* 불투명도: 80% */}
//           />
//       </mesh>

//       {/* 메시지 버블 3 (받은 메시지) */}
//       <mesh position={[-0.12, 0.1, 0.002]}> {/* 위치: 왼쪽으로 12cm, 위쪽으로 10cm, 앞으로 0.2cm */}
//         <planeGeometry args={[0.28, 0.07]} /> {/* 평면 크기: 가로 28cm, 세로 7cm */}
//         <meshStandardMaterial  {/* 표준 재질 */}
//           color="#e5e7eb" {/* 색상: 밝은 회색 (받은 메시지 색상) */}
//           transparent  {/* 투명도 활성화 */}
//           opacity={0.8} {/* 불투명도: 80% */}
//           />
//       </mesh>

//       {/* 메시지 버블 4 (보낸 메시지) */}
//       <mesh position={[0.18, 0, 0.002]}> {/* 위치: 오른쪽으로 18cm, 중앙, 앞으로 0.2cm */}
//         <planeGeometry args={[0.2, 0.04]} /> {/* 평면 크기: 가로 20cm, 세로 4cm */}
//         <meshStandardMaterial  {/* 표준 재질 */}
//           color="#3b82f6" {/* 색상: 파란색 (보낸 메시지 색상) */}
//           transparent  {/* 투명도 활성화 */}
//           opacity={0.8} {/* 불투명도: 80% */}
//           />
//         </mesh>
      
//       {/* 메시지 버블 5 (받은 메시지) */}
//       <mesh position={[-0.1, -0.1, 0.002]}> {/* 위치: 왼쪽으로 10cm, 아래로 10cm, 앞으로 0.2cm */}
//         <planeGeometry args={[0.24, 0.05]} /> {/* 평면 크기: 가로 24cm, 세로 5cm */}
//         <meshStandardMaterial  {/* 표준 재질 */}
//           color="#e5e7eb" {/* 색상: 밝은 회색 (받은 메시지 색상) */}
//           transparent  {/* 투명도 활성화 */}
//           opacity={0.8} {/* 불투명도: 80% */}
//           />
//       </mesh>
      
//       {/* 입력창 (하단) */}
//       <mesh position={[0, -0.5, 0.001]}> {/* 위치: 중앙, 아래로 50cm, 앞으로 0.1cm */}
//         <planeGeometry args={[0.55, 0.08]} /> {/* 평면 크기: 가로 55cm, 세로 8cm */}
//         <meshStandardMaterial  {/* 표준 재질 */}
//           color="#ffffff" {/* 색상: 흰색 */}
//           transparent  {/* 투명도 활성화 */}
//           opacity={0.9} {/* 불투명도: 90% */}
//           />
//         </mesh>

//       {/* 전송 버튼 (정적) */}
//       <mesh position={[0.22, -0.5, 0.002]}> {/* 위치: 오른쪽으로 22cm, 아래로 50cm, 앞으로 0.2cm */}
//         <circleGeometry args={[0.025, 16]} /> {/* 원형 도형: 반지름 2.5cm, 16개 분할선 */}
//         <meshStandardMaterial  {/* 표준 재질 */}
//           color="#3b82f6" {/* 색상: 파란색 */}
//           transparent  {/* 투명도 활성화 */}
//           opacity={0.9} {/* 불투명도: 90% */}
//           />
//         </mesh>
//       </group>
//   );
// }

// // 디버깅하기 좋은 아이폰 3D 모델 (애니메이션 포함)
// function SmartPhone() {
//   // 3D 그룹 객체에 대한 참조 (애니메이션을 위해 필요)
//   const phoneRef = useRef<THREE.Group>(null); 
  
//   // 매 프레임마다 실행되는 훅 (60fps로 애니메이션 생성)
//   useFrame((state) => {
//     // 참조 객체가 존재할 때만 실행
//     if (phoneRef.current) {
//       // 애플리케이션 시작 후 경과된 시간 (초 단위)
//       const t = state.clock.getElapsedTime();
      
//       // 핸드폰 부드러운 Y축 회전 (좌우 흔들림)
//       // 0.2: 기본 회전각 (약 11도 오른쪽으로 기울임)
//       // Math.sin(t * 0.3): 사인파 함수로 부드러운 진동 생성 (0.3은 속도)
//       // 0.05: 진동 범위 (약 ±3도)
//       phoneRef.current.rotation.y = 0.2 + Math.sin(t * 0.3) * 0.05;
      
//       // 핸드폰 부드러운 X축 회전 (상하 흔들림)  
//       // 0.1: 기본 회전각 (약 6도 위쪽으로 기울임)
//       // Math.sin(t * 0.2): Y축보다 느린 속도로 진동 (자연스러운 효과)
//       // 0.02: 작은 진동 범위 (약 ±1도)
//       phoneRef.current.rotation.x = 0.1 + Math.sin(t * 0.2) * 0.02;
//     }
//   });
  
//   // 모든 폰 부품들을 묶는 그룹
//   // 애니메이션을 위한 참조 연결
//   // 그룹 위치: 화면 중앙
//   // 그룹 기본 회전: x축 6도, y축 11도, z축 -6도
//   return (
//     <group
//       ref={phoneRef}
//       position={[0, 0, 0]}
//       rotation={[0.1, 0.2, -0.1]}
//     >
//       {/* 메탈 프레임 컴포넌트 */}
//       <PhoneFrame />
//       {/* 화면 컴포넌트 */}
//       <PhoneScreen />
//       {/* 홈 인디케이터 컴포넌트 */}
//       <HomeIndicator />
//       {/* 메신저 UI 컴포넌트 */}
//       <MessengerInterface />
//     </group>
//   );
// }

// // 단순한 조명 설정
// function SimpleLights() {
//   // Fragment: 여러 요소를 감싸는 빈 태그
//   // 전역 조명: 모든 방향에서 균등하게 비추는 빛 (강도 0.6)
//   // 방향성 조명: 태양빛처럼 한 방향에서 비추는 빛
//   // 조명 위치: 오른쪽 위 앞쪽에서 비춤
//   // 조명 강도: 1.0 (기본값)
//   // 조명 색상: 흰색
//   return (
//     <>
//       <ambientLight intensity={0.6} />
//       <directionalLight 
//         position={[3, 3, 4]}
//         intensity={1.0}
//         color="#ffffff"
//       />
//     </>
//   );
// }

// // 3D 씬 (Three.js 캔버스)
// function Hero3D() {
//   // Three.js를 React에서 사용할 수 있게 해주는 캔버스
//   // 카메라 설정: 위치와 시야각
//   // CSS 스타일: 전체 크기
//   // 해상도 배율: 최소 1배, 최대 2배 (고해상도 디스플레이 대응)
//   // WebGL 설정: 안티앨리어싱으로 부드러운 테두리
//   return (
//     <Canvas
//       camera={{ position: [3, 2, 4], fov: 40 }}
//       style={{ width: '100%', height: '100%' }}
//       dpr={[1, 2]}
//       gl={{ antialias: true }}
//     >
//       {/* 조명 컴포넌트 */}
//       <SimpleLights />
//       {/* 스튜디오 환경 조명 (반사와 그림자 효과) */}
//       <Environment preset="studio" />
//       {/* 스마트폰 3D 모델 */}
//       <SmartPhone />
//     </Canvas>
//   );
// }

// // 메인 히어로 섹션 컴포넌트
// export default function HeroSection({ id = 'hero', className = '' }) {
//   // 사용자의 애니메이션 선호도 확인
//   const prefersReducedMotion = useReducedMotion();
//   // 페이지 로딩 상태 관리
//   const [isLoaded, setIsLoaded] = useState(false);
//   // 컴포넌트가 마운트되면 로딩 완료로 설정
//   useEffect(() => { setIsLoaded(true); }, []);
  
//   // 컨테이너 스타일:
//   // - min-h-screen: 최소 화면 높이
//   // - w-full: 전체 너비
//   // - flex items-center justify-center: 중앙 정렬
//   // - -mt-16 pt-16: 네비게이션 바 오버랩 처리
//   // - bg-[#f8fafc]: 배경색 (매우 밝은 회색)
//   // - text-gray-900: 텍스트 색상 (어두운 회색)
//   // - overflow-hidden: 넘치는 콘텐츠 숨김
//   // - py-8 lg:py-16: 상하 패딩 (모바일 8, 대화면 16)
//   return (
//     <section
//       id={id}
//       className={`min-h-screen w-full flex items-center justify-center -mt-16 pt-16 bg-[#f8fafc] text-gray-900 overflow-hidden py-8 lg:py-16 ${className}`}
//       aria-label="뉴스 추천 서비스 소개"
//     >
//       <div className="w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-4rem)] h-[calc(100vh-8rem)] lg:h-[calc(100vh-12rem)] mx-auto rounded-xl bg-white/90 shadow-2xl flex flex-col lg:flex-row items-center p-2 lg:p-4 gap-2 lg:gap-4 relative">
//         {/* Framer Motion 애니메이션 div */}
//         <motion.div
//           className="flex-1 flex flex-col justify-center items-start z-10 max-w-lg px-2 lg:px-4"
//           initial={{ opacity: 0, x: -40 }}
//           animate={isLoaded ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
//         >
//           {/* 메인 제목 */}
//           <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
//             Discover Your News
//           </h1>
//           {/* 부제목 */}
//           <p className="text-lg lg:text-xl xl:text-2xl text-gray-600 mb-6 lg:mb-8">
//             Your Personalized News Feed
//           </p>
//           {/* Next.js 링크 컴포넌트 */}
//           <Link href="/register">
//             {/* 애니메이션 버튼 */}
//             <motion.button
//               className="px-8 py-4 bg-black text-white rounded-full font-semibold text-lg shadow-lg hover:bg-gray-900 transition-all"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.96 }}
//             >
//               Get Started Now
//             </motion.button>
//           </Link>
//         </motion.div>
        
//         {/* 3D 모델 컨테이너 */}
//         <div className="flex-1 min-h-[400px] h-[400px] lg:h-[650px] w-full lg:w-[650px] relative">
//           {/* 3D 모델 애니메이션 래퍼 */}
//           <motion.div 
//             className="absolute inset-0"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
//             transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
//           >
//             <Hero3D />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }