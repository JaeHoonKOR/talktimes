  <section 
    id={id}
    className={`py-20 bg-[#F9FAFB] dark:bg-[#1C1C1E] w-full max-w-none mx-0 ${className}`}
    aria-label="개인화 설정"
  >
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* 섹션 헤더 */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#121212] dark:text-[#F0F0F0] mb-4">
          당신만의 <span className="text-[#3B82F6]">뉴스 취향</span> 설정
        </h2>
        <p className="text-lg text-[#4B5563] dark:text-[#9CA3AF] max-w-2xl mx-auto">
          관심 키워드를 선택하면 AI가 맞춤형 뉴스를 추천해드립니다
        </p>
      </motion.div>

      {/* 키워드 매니저 또는 맞춤형 뉴스 섹션 */}
      <div className="max-w-4xl mx-auto bg-[#F9FAFB] dark:bg-[#2C2C2E] rounded-xl shadow-none border-none p-6 mb-12">
        {showNewsSection ? (
          <PersonalizedNewsSection initialKeywords={selectedKeywords} />
        ) : (
          <KeywordManager onSettingsComplete={handleSettingsComplete} />
        )}
      </div>

      {/* 개인화 혜택 (뉴스 섹션이 표시되지 않을 때만 표시) */}
      {!showNewsSection && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              // ... existing code ...
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-[#F9FAFB] dark:bg-[#2C2C2E] rounded-lg p-5 shadow-none border-none"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F9FAFB] dark:bg-[#1C1C1E] p-3 rounded-lg text-[#3B82F6]">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#121212] dark:text-[#F0F0F0] mb-1">{benefit.title}</h3>
                    <p className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
              // ... existing code ...
            ]}
          </div>

          {/* 개인화 통계 */}
          <motion.div 
            className="mt-12 flex justify-center"
            variants={itemVariants}
          >
            <div className="grid grid-cols-3 gap-6 md:gap-12 bg-[#F9FAFB] dark:bg-[#2C2C2E] rounded-xl p-6 shadow-none border-none">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3B82F6]">95%</div>
                <div className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">정확도</div>
              </div>
              <div className="text-center border-x-0 px-6">
                <div className="text-2xl font-bold text-[#3B82F6]">2분</div>
                <div className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">읽기 시간</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3B82F6]">매일</div>
                <div className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">자동 배송</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  </section> 