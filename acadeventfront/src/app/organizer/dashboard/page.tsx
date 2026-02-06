"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RoleGuard from "@/components/role-guard";
import { fetchJson } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  description: string;
  startAt: string;
  modality: string;
}

export default function OrganizerDashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("acadevent_user") || "{}");
        if (!user.id) return;
        const data = await fetchJson<Event[]>(`/events?organizerId=${user.id}`);
        setEvents(data);
      } catch {
        // Ignore
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  return (
    <RoleGuard allowedRoles={["ORGANIZADOR"]}>
      <div className="space-y-8">
        <section className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border bg-card p-8 shadow-sm">
          <div>
            <h1 className="text-3xl font-semibold">Panel del organizador</h1>
            <p className="text-muted-foreground">
              Crea y gestiona tus eventos, controla inscripciones y asistencia.
            </p>
          </div>
          <Button asChild>
            <Link href="/organizer/events/create">Crear evento</Link>
          </Button>
        </section>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Eventos publicados", value: events.length.toString(), detail: "Activos" },
            { title: "Inscripciones totales", value: "520", detail: "Confirmadas" },
            { title: "Asistencia registrada", value: "430", detail: "Validada" },
          ].map((item) => (
            <Card key={item.title} className="border-muted/60 bg-white/90">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-3xl font-semibold">{item.value}</span>
                <span className="text-xs text-muted-foreground">{item.detail}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mis eventos</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Cargando eventos...</p>
            ) : events.length === 0 ? (
              <p>No has creado eventos aún.</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.startAt).toLocaleDateString()} - {event.modality}
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href={`/organizer/events/${event.id}`}>Ver detalles</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
