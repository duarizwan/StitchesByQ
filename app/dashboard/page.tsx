import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserOrders } from "@/lib/actions/orders";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await getUserOrders(user.id);

  const handleSignOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <form action={handleSignOut}>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Sign Out
            </Button>
          </form>
        </div>

        <div className="grid gap-6">
          {/* User Info Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {user.user_metadata?.first_name}{" "}
                {user.user_metadata?.last_name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Member Since:</strong>{" "}
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </Card>

          {/* Orders Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

            {orders.length === 0 ? (
              <p className="text-gray-600">
                No orders found.{" "}
                <a href="/order" className="text-blue-600 hover:underline">
                  Place your first order
                </a>
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{order.dress_type}</h3>
                        <p className="text-sm text-gray-600">
                          Ordered on{" "}
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Measurement Type:</strong>{" "}
                        {order.measurement_type}
                      </p>
                      {order.delivery_date_time && (
                        <p>
                          <strong>Expected Delivery:</strong>{" "}
                          {new Date(
                            order.delivery_date_time
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </Container>
    </main>
  );
}
