import { prisma } from "@/lib/prisma";
import UnitPageClient from "./UnitPageClient";
import { UnitWithId } from "./components/unitEditDialog";

export default async function UnitPage() {
    const units: UnitWithId[] = await prisma.unit.findMany();
    return <UnitPageClient units={units} />;
}