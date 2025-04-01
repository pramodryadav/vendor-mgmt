import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";


export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 p-8 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-700">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Vendor List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 flex items-center space-x-2">
              <Skeleton className="h-10 w-full" /> {/* Simulating Search Bar */}
            </div>
            <div className="overflow-x-auto space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
