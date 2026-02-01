// components/layout/navbar.tsx
import './navbar.css';
import Link from 'next/link'; // Next.js Link

export default function Navbar() {
  return (
    <nav className='navbar'>
      <Link href='/' className='nav-title'>Meal Planning</Link>
      <ul>
        <li>
          <Link href='/'>Weekly Meals</Link>
        </li>
        <li>
          <Link href='/meals'>Explore Recipes</Link>
        </li>
        <li>
          <Link href='/pantry'>My Pantry</Link>
        </li>
      </ul>
    </nav>
  );
}