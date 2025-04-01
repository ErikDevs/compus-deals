import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, Users } from "lucide-react";

export function SubscriptionMetrics() {
  return (
    <Card className="w-full max-w-md my-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2,350</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center">
          <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
          <span className="text-green-500 font-medium">180.1%</span> from last
          month
        </p>
      </CardContent>
    </Card>
  );
}

export default SubscriptionMetrics;
