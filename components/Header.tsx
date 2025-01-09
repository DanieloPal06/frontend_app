"use client"

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-5 py-2 flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="w-full md:w-1/4 mb-4 md:mb-0">
          <div className="bg-white border-2 border-white rounded-lg p-2 flex items-center justify-center w-full md:w-[150px] h-[100px]">
            <Image src="/logo.png" alt="Logo" width={120} height={120} />
          </div>
        </Link>
        <nav className="w-full md:w-auto">
          <ul className="flex flex-row space-x-4 justify-between">
            <li>
              <Link href="/" passHref>
                <Button variant={pathname === '/' ? 'default' : 'ghost'}>Home</Button>
              </Link>
            </li>
            <li>
              <Link href="/matches" passHref>
                <Button variant={pathname === '/matches' ? 'default' : 'ghost'}>Matches</Button>
              </Link>
            </li>
            <li>
              <Link href="/courses" passHref>
                <Button variant={pathname === '/courses' ? 'default' : 'ghost'}>Courses</Button>
              </Link>
            </li>
            {/* <li>
              <Link href="/subscription" passHref>
                <Button variant={pathname === '/subscription' ? 'default' : 'ghost'}>Subscribe</Button>
              </Link>
            </li> */}
          </ul>
        </nav>
        <div className="flex items-center space-x-4 w-full md:w-1/4 justify-end mt-4 md:mt-0">
          <ModeToggle />
          {/* <Link href="/login" passHref>
            <Button>Login</Button>
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;