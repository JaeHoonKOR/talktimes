'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NewsletterSignupProps {
  selectedKeywords: Array<{
    id?: number;
    keyword: string;
    category: string;
  }>;
  selectedTopics: string[];
}

export default function NewsletterSignup({ selectedKeywords, selectedTopics = [] }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage('유효한 이메일을 입력해주세요.');
      return;
    }
    
    // 토픽이나 키워드 중 하나 이상 선택되었는지 확인
    if (selectedTopics.length === 0 && selectedKeywords.length === 0) {
      setMessage('최소 하나의 토픽이나 키워드를 선택해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');
    
    // 실제 구현에서는 이메일과 선택된 키워드와 토픽을 서버에 전송
    try {
      // 시뮬레이션된 API 호출 (나중에 실제 API 호출로 대체)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('성공! 이메일로 확인 링크를 보냈습니다.');
      setEmail('');
    } catch (error) {
      setMessage('죄송합니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 카테고리별로 키워드 그룹화
  const groupedKeywords = selectedKeywords.reduce<Record<string, string[]>>((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [];
    }
    acc[curr.category].push(curr.keyword);
    return acc;
  }, {});

  const hasPersonalization = selectedTopics.length > 0 || selectedKeywords.length > 0;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">관심사 기반 뉴스레터 구독</CardTitle>
        <CardDescription>
          선택하신 관심사에 맞는 맞춤형 뉴스를 매일 아침 메일로 받아보세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* 선택된 토픽 표시 */}
        {selectedTopics.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">선택하신 토픽</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTopics.map((topic, idx) => (
                <Badge key={idx} variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-200 px-3 py-1">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* 선택된 키워드 표시 */}
        {selectedKeywords.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">선택하신 관심 키워드</h3>
            <div className="space-y-4">
              {Object.entries(groupedKeywords).map(([category, keywords]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 선택이 없을 경우 안내 메시지 */}
        {!hasPersonalization && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <p className="text-amber-700">
              아직 선택된 토픽이나 키워드가 없습니다. 위에서 토픽이나 키워드를 선택해보세요!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting || !hasPersonalization} 
              className="whitespace-nowrap"
            >
              {isSubmitting ? '처리 중...' : '뉴스레터 구독'}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
          {message && (
            <p className={`mt-2 text-sm ${message.includes('성공') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-sm text-gray-500">이미 계정이 있으신가요?</p>
        <Link href="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
          로그인하기
        </Link>
      </CardFooter>
    </Card>
  );
} 