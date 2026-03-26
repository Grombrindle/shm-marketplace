import { Inter, Tajawal } from 'next/font/google';

// Configure Inter for English text
export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

// Configure Tajawal for Arabic text
export const tajawal = Tajawal({
    subsets: ['arabic'],
    variable: '--font-tajawal',
    weight: ['400', '500', '700'], // optional: include the weights you need
    display: 'swap',
});