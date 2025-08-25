import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export default function LoadingServices() {
  return (
    <div className="py-20 bg-off-white">
      <Container>
        <div className="text-center mb-16">
          <div className="h-12 w-64 bg-charcoal/10 rounded-lg animate-pulse mx-auto mb-4" />
          <div className="h-6 w-96 bg-charcoal/10 rounded-lg animate-pulse mx-auto" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="h-64 w-full bg-charcoal/10 animate-pulse" />
              <Card.Header>
                <div className="h-8 w-48 bg-charcoal/10 rounded-lg animate-pulse" />
                <div className="h-6 w-32 bg-charcoal/10 rounded-lg animate-pulse mt-2" />
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-charcoal/10 rounded-lg animate-pulse" />
                  <div className="h-4 w-5/6 bg-charcoal/10 rounded-lg animate-pulse" />
                  <div className="h-4 w-4/6 bg-charcoal/10 rounded-lg animate-pulse" />
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
