import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function accordPage() {
    const faq = [
        {
            "qustion": "text",
            "answer": "answer"
        }
    ]
  return (
    <>
    <div className="flex justify-center items-center h-full min-h-screen p-4 m-">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
    </>
  );
}

export default accordPage;
