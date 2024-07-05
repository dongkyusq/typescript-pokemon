"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li className="text-blue-600">
          <Link href="/">이전으로 돌아가기</Link>
        </li>
      </ul>
    </nav>
  );
}
