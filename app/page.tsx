"use client";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button
        onClick={() => {
          window.location.href = "http://localhost:5000/auth/google";
        }}
      >
        Connect Gmail
      </button>
    </div>
  );
}
