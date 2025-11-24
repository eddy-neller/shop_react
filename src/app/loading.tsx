import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-grow py-16 px-4 bg-gray-50">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Spinner className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Chargement...</CardTitle>
          <CardDescription className="mt-2">
            Veuillez patienter pendant le chargement de la page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary animate-pulse"
                style={{ width: "60%" }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Chargement en cours...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
