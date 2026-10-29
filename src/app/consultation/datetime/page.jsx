import { Suspense } from "react";
import BookingSystem from '@/components/Consultation/BookingSystem';

export default function DateTimePage() {
   return (
        <Suspense>
            <BookingSystem />
        </Suspense>
    );
}