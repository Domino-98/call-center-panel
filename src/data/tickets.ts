import type { Ticket } from '@/types/ticket'

export const mockTickets: Ticket[] = [
  {
    id: 1,
    customerName: 'Jan Kowalski',
    subject: 'Problem z logowaniem',
    description:
      'Od wczoraj nie mogę zalogować się do systemu. Ciągle pojawia się błąd „Nieprawidłowe dane logowania", mimo że jestem pewien, że hasło jest poprawne. Próbowałem je zresetować, ale e-mail z resetem nie przychodzi.',
    priority: 'high',
    status: 'new',
    createdAt: '2026-02-06T10:30:00',
  },
  {
    id: 2,
    customerName: 'Anna Nowak',
    subject: 'Faktura nie została wygenerowana',
    description:
      'W zeszłym tygodniu złożyłam zamówienie (nr #4521), a faktura nadal nie została wygenerowana. Potrzebuję jej do rozliczeń księgowych do końca tego miesiąca. Proszę o przyspieszenie.',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-02-05T14:15:00',
  },
  {
    id: 3,
    customerName: 'Piotr Wiśniewski',
    subject: 'Aplikacja zawiesza się na dashboardzie',
    description:
      'Za każdym razem, gdy otwieram główny dashboard, aplikacja zamraża się na około 10 sekund, a potem się zamyka. Używam Chrome 121 na Windows 11. Problem zaczął się po ostatniej aktualizacji.',
    priority: 'high',
    status: 'new',
    createdAt: '2026-02-06T09:00:00',
  },
  {
    id: 4,
    customerName: 'Maria Zielińska',
    subject: 'Zmiana planu subskrypcji',
    description:
      'Chciałabym zmienić subskrypcję z planu Basic na Professional. Proszę również o potwierdzenie, czy moje dotychczasowe dane i ustawienia zostaną zachowane podczas przejścia.',
    priority: 'low',
    status: 'closed',
    createdAt: '2026-02-01T11:45:00',
  },
  {
    id: 5,
    customerName: 'Tomasz Lewandowski',
    subject: 'Płatność odrzucona',
    description:
      'Moje ostatnie trzy próby płatności zostały odrzucone, mimo że karta jest ważna i ma wystarczające środki. Komunikat błędu mówi „Nie można przetworzyć transakcji". Proszę o pilne rozwiązanie problemu.',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2026-02-04T16:20:00',
  },
  {
    id: 6,
    customerName: 'Katarzyna Dąbrowska',
    subject: 'Brakujące produkty w zamówieniu',
    description:
      'Otrzymałam dzisiaj zamówienie #7823, ale brakuje w nim dwóch produktów: myszki bezprzewodowej i huba USB. Na liście pakowania widnieją wszystkie produkty, ale w paczce była tylko klawiatura.',
    priority: 'medium',
    status: 'new',
    createdAt: '2026-02-06T08:10:00',
  },
  {
    id: 7,
    customerName: 'Michał Szymański',
    subject: 'Prośba o funkcję: tryb ciemny',
    description:
      'Chciałbym, aby w aplikacji pojawił się tryb ciemny. Praca w późnych godzinach z jasnym interfejsem jest męcząca dla oczu. Wielu członków naszego zespołu również o to prosiło.',
    priority: 'low',
    status: 'closed',
    createdAt: '2026-01-28T13:00:00',
  },
  {
    id: 8,
    customerName: 'Ewa Kamińska',
    subject: 'Nie można eksportować raportów',
    description:
      'Funkcja eksportu do PDF na stronie raportów przestała działać. Po kliknięciu „Eksportuj" pojawia się spinner ładowania, ale nic się nie pobiera. Eksport do CSV działa prawidłowo. Blokuje to nasze miesięczne raportowanie.',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-02-03T10:50:00',
  },
  {
    id: 9,
    customerName: 'Robert Jankowski',
    subject: 'Problem z bezpieczeństwem konta',
    description:
      'Otrzymałem powiadomienie o logowaniu z nierozpoznanego urządzenia w innym kraju. Nie autoryzowałem tego dostępu. Proszę o sprawdzenie aktywności mojego konta i natychmiastowe jego zabezpieczenie.',
    priority: 'high',
    status: 'new',
    createdAt: '2026-02-06T07:30:00',
  },
  {
    id: 10,
    customerName: 'Aleksandra Wójcik',
    subject: 'Wolne ładowanie stron',
    description:
      'W ciągu ostatniego tygodnia aplikacja stała się wyjątkowo wolna. Strony, które wcześniej ładowały się w 1-2 sekundy, teraz potrzebują ponad 10 sekund. Problem dotyczy całego naszego zespołu 15 osób, niezależnie od przeglądarki i urządzenia.',
    priority: 'medium',
    status: 'new',
    createdAt: '2026-02-05T15:40:00',
  },
]
