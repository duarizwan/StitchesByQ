import SignupForm from "@/components/auth/signup-form";
import { Container } from "@/components/ui/container";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <Container>
        <SignupForm />
      </Container>
    </main>
  );
}
