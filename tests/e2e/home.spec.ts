import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/JikSend/);
    
    // 메인 히어로 섹션이 존재하는지 확인
    await expect(page.locator('h1')).toBeVisible();
    
    // 네비게이션 바가 존재하는지 확인
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    // 로그인 버튼 클릭
    await page.click('text=로그인');
    
    // 로그인 페이지로 이동했는지 확인
    await expect(page).toHaveURL(/.*login/);
  });

  test('should display personalization section', async ({ page }) => {
    await page.goto('/');
    
    // 개인화 섹션이 존재하는지 확인
    await expect(page.locator('[data-testid="personalization-section"]')).toBeVisible();
    
    // 키워드 입력 필드가 존재하는지 확인
    await expect(page.locator('input[placeholder*="키워드"]')).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // 스킵 네비게이션이 존재하는지 확인
    await expect(page.locator('[data-testid="skip-navigation"]')).toBeVisible();
    
    // 키보드로 네비게이션 가능한지 확인
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });
}); 