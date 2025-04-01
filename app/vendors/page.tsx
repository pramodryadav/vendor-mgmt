
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import VendorList from './components/VendorList'
import ThemeToggle from './components/ToggleTheme'
import AddVendorButton from "./components/AddVendorBtn"
import SearchInput from "./components/SearchInput"




export default async function Vendors({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {

  const { query = "" } = (await searchParams);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vendors?query=${query}`);
  const vendors = await res.json();


  return (
    <div className={`min-h-screen`}>
      <div className="bg-gray-100 p-8 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-700">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor List</CardTitle>
            <ThemeToggle />
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 flex items-center space-x-2">
              <SearchInput defaultQuery={query} />
              <AddVendorButton />
            </div>
            <div className="overflow-x-auto">
              <VendorList vendors={vendors} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}