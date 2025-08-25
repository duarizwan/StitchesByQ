import LoginForm from "@/components/auth/login-form";
import { Container } from "@/components/ui/container";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <Container>
        <LoginForm />
      </Container>
    </main>
  );
}
