import { render, screen } from '@testing-library/react';
import Navbar from '../../app/components/Navbar';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
}));

describe('Navbar', () => {
  it('renders without crashing', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays logo', () => {
    render(<Navbar />);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it('has login button', () => {
    render(<Navbar />);
    expect(screen.getByText(/로그인/i)).toBeInTheDocument();
  });

  it('has mobile menu button', () => {
    render(<Navbar />);
    expect(screen.getByLabelText(/메뉴/i)).toBeInTheDocument();
  });
}); 