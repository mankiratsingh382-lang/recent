import { Course, BlogPost, CareerItem } from '../types';

// Mock Data
const COURSES: Course[] = [
  {
    id: '1',
    title: 'Fundamentals of Stock Trading',
    description: 'Learn the essential strategies and technical skills required to succeed in stock trading.',
    image: 'https://picsum.photos/400/250?random=1'
  },
  {
    id: '2',
    title: 'Technical Analysis Mastery',
    description: 'Deep dive into charts, indicators, and market trends to predict price movements.',
    image: 'https://picsum.photos/400/250?random=2'
  },
  {
    id: '3',
    title: 'Options Trading Explained',
    description: 'Understand options terminology, strategies, and risk management techniques.',
    image: 'https://picsum.photos/400/250?random=3'
  }
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Market Sentiment',
    summary: 'How trader psychology affects market trends and decision-making in trading.',
    content: 'Market sentiment refers to the overall attitude of investors toward a particular security or financial market. It is the feeling or tone of a market, or its crowd psychology, as revealed through the activity and price movement of the securities traded in that market. In broad terms, rising prices indicate bullish market sentiment, while falling prices indicate bearish market sentiment.',
    image: 'https://picsum.photos/400/250?random=4'
  },
  {
    id: '2',
    title: 'Top 5 Technical Indicators',
    summary: 'A beginner’s guide to the most effective technical indicators for trading success.',
    content: '1. Moving Average (MA): Identifies the trend direction.\n2. Relative Strength Index (RSI): Measures the speed and change of price movements.\n3. Bollinger Bands: Measures market volatility.\n4. Stochastic Oscillator: Compares a closing price to a range of prices.\n5. MACD: Shows the relationship between two moving averages of a security’s price.',
    image: 'https://picsum.photos/400/250?random=5'
  },
  {
    id: '3',
    title: 'Risk Management in Trading',
    summary: 'Explore key principles to protect your capital and manage trading risks wisely.',
    content: 'Risk management is the process of identifying, analyzing, and accepting or mitigating uncertainty in investment decisions. Essentially, risk management occurs when an investor or fund manager analyzes and attempts to quantify the potential for losses in an investment, such as a moral hazard, and then takes the appropriate action (or inaction) given his investment objectives and risk tolerance.',
    image: 'https://picsum.photos/400/250?random=6'
  }
];

const CAREER_ITEMS: CareerItem[] = [
  {
    id: '1',
    title: 'Building a Trading Career',
    description: 'Essential steps and skills to become a professional trader in today’s markets.',
    icon: '📈'
  },
  {
    id: '2',
    title: 'Job Opportunities in Finance',
    description: 'Discover promising roles and how to leverage your trading knowledge to land jobs.',
    icon: '💼'
  },
  {
    id: '3',
    title: 'Networking Tips for Traders',
    description: 'How to connect with industry experts and grow your professional network.',
    icon: '🤝'
  }
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  fetchCourses: async (): Promise<Course[]> => {
    await delay(600);
    return COURSES;
  },

  fetchBlogPosts: async (): Promise<BlogPost[]> => {
    await delay(600);
    return BLOG_POSTS;
  },

  fetchCareerItems: async (): Promise<CareerItem[]> => {
    await delay(600);
    return CAREER_ITEMS;
  },

  sendOtp: async (phone: string): Promise<string> => {
    await delay(1000);
    console.log(`[Mock Backend] OTP sent to ${phone}: 1234`);
    return '1234'; // In a real app, this wouldn't be returned, handled server-side
  },

  verifyOtp: async (phone: string, code: string): Promise<boolean> => {
    await delay(800);
    return code === '1234';
  },

  registerUser: async (data: any): Promise<void> => {
    await delay(1200);
    console.log('[Mock Backend] User registered:', data);
  }
};