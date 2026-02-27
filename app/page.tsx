import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-8 p-8 max-w-2xl">
        <div className="space-y-4">
          <div className="text-7xl">🎓</div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">
            PW Coupons Bot is Live
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto text-pretty">
            Your Telegram bot for educational coupon codes is up and running. 
            Get discounts on Physics Wallah, Motion, Unacademy, and more!
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="https://t.me/PWcouponsBot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="text-base px-8">
              Open Bot in Telegram
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" size="sm">
              Admin Dashboard
            </Button>
          </Link>
        </div>

        <div className="pt-8 space-y-3 text-sm text-muted-foreground border-t border-border">
          <p className="font-medium text-foreground">API Endpoints</p>
          <div className="flex flex-wrap justify-center gap-4">
            <code className="bg-muted px-3 py-1.5 rounded-md">/api/telegram/webhook</code>
            <code className="bg-muted px-3 py-1.5 rounded-md">/api/health</code>
          </div>
        </div>
      </div>
    </main>
  );
}
