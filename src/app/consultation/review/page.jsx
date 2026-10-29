import { Suspense } from "react";
import BookingSystem from '@/components/Consultation/BookingSystem';
export default function ReviewPage() {
   return (
          <Suspense >
              <BookingSystem />
          </Suspense>
      );
}