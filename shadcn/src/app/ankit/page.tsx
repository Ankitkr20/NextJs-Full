import { Button } from "@/components/ui/button"


function newPage() {
  return (
    <main className="h-full flex justify-center items-center min-h-screen flex-col">
        <div>page 😀</div>
        <button className="px-4 py-2 my-2 bg-amber-300 border-1 border-white shadow-amber-200 rounded-lg hover:bg-amber-700">Test</button>
        <Button variant='outline' > Shadcn</Button>
    </main>
  )
}

export default newPage