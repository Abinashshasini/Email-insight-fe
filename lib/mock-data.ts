export const mockUser = {
  name: 'Abinash',
  email: 'abinash@gmail.com',
  picture: null,
  connectedAt: '2024-01-10T10:00:00Z',
}

export const mockMetrics = {
  totalEmails: 2847,
  todayInsights: 12,
  pendingActions: 3,
  extractionRate: 94,
  regexRate: 71,
  aiRate: 23,
  lastSynced: '2024-01-15T12:32:00Z',
}

export const mockInsights = [
  {
    id: '1',
    type: 'flight',
    data: {
      flightNumber: '6E 342',
      airline: 'IndiGo',
      origin: 'BLR',
      destination: 'DEL',
      departureAt: '2024-01-15T18:45:00Z',
      pnr: 'ABC123',
    },
    sender: 'notifications@goindigo.in',
    subject: 'Your booking is confirmed – 6E 342',
    extractedAt: '2024-01-15T10:00:00Z',
    confidence: 0.98,
  },
  {
    id: '2',
    type: 'finance',
    data: {
      merchant: 'HDFC Bank',
      amount: 8240,
      currency: 'INR',
      dueDate: '2024-01-16T23:59:59Z',
      accountLast4: '4521',
    },
    sender: 'alerts@hdfcbank.com',
    subject: 'Credit Card Statement – January 2024',
    extractedAt: '2024-01-14T09:00:00Z',
    confidence: 0.97,
  },
  {
    id: '3',
    type: 'movie',
    data: {
      movieName: 'Pushpa 2: The Rule',
      showTime: '2024-01-15T21:00:00Z',
      venue: 'PVR Forum Mall, Bengaluru',
      seats: 'F4, F5',
    },
    sender: 'noreply@bookmyshow.com',
    subject: 'Booking confirmed – Pushpa 2',
    extractedAt: '2024-01-13T15:30:00Z',
    confidence: 0.99,
  },
  {
    id: '4',
    type: 'delivery',
    data: {
      merchant: 'Amazon',
      orderNumber: 'OD334455667',
      expectedDelivery: '2024-01-15T20:00:00Z',
    },
    sender: 'auto-confirm@amazon.in',
    subject: 'Your order #OD334455667 is out for delivery',
    extractedAt: '2024-01-15T08:00:00Z',
    confidence: 0.95,
  },
  {
    id: '5',
    type: 'hotel',
    data: {
      hotelName: 'Taj Palace',
      checkIn: '2024-01-20T14:00:00Z',
      checkOut: '2024-01-22T11:00:00Z',
      confirmationId: 'TPD-2024-8821',
    },
    sender: 'reservations@tajhotels.com',
    subject: 'Booking confirmed – Taj Palace New Delhi',
    extractedAt: '2024-01-12T11:00:00Z',
    confidence: 0.96,
  },
  {
    id: '6',
    type: 'shopping',
    data: {
      merchant: 'Myntra',
      orderNumber: 'MYN-9987654',
      amount: 2899,
      expectedDelivery: '2024-01-17T20:00:00Z',
    },
    sender: 'orders@myntra.com',
    subject: 'Order confirmed – Your fashion picks are on the way',
    extractedAt: '2024-01-11T16:30:00Z',
    confidence: 0.93,
  },
]

export const mockEmails = [
  { id: 'e1', sender: 'IndiGo', from: 'notifications@goindigo.in', subject: 'Your booking is confirmed – 6E 342', receivedAt: '2h ago', score: 97, type: 'flight', extracted: true },
  { id: 'e2', sender: 'HDFC Bank', from: 'alerts@hdfcbank.com', subject: 'Credit card statement – January 2024', receivedAt: '5h ago', score: 88, type: 'finance', extracted: true },
  { id: 'e3', sender: 'Amazon', from: 'auto-confirm@amazon.in', subject: 'Your order #OD334455 is out for delivery', receivedAt: '1d ago', score: 62, type: 'delivery', extracted: true },
  { id: 'e4', sender: 'BookMyShow', from: 'noreply@bookmyshow.com', subject: 'Booking confirmed – Pushpa 2: The Rule', receivedAt: '2d ago', score: 95, type: 'movie', extracted: true },
  { id: 'e5', sender: 'Swiggy', from: 'no-reply@swiggy.in', subject: 'Your order is on the way!', receivedAt: '3d ago', score: 40, type: 'delivery', extracted: false },
  { id: 'e6', sender: 'Zomato', from: 'noreply@zomato.com', subject: '50% off your next order – Today only', receivedAt: '3d ago', score: 8, type: 'promo', extracted: false },
]

export const mockSpendData = [
  { week: 'Dec 25', amount: 4200 },
  { week: 'Jan 1', amount: 7800 },
  { week: 'Jan 8', amount: 3100 },
  { week: 'Jan 15', amount: 9400 },
]

export const mockMerchants = [
  { name: 'Amazon', amount: 12450 },
  { name: 'Swiggy', amount: 4200 },
  { name: 'BookMyShow', amount: 2800 },
  { name: 'Uber', amount: 1600 },
  { name: 'Zomato', amount: 1200 },
]

export const mockCategories = [
  { name: 'Finance', value: 42, color: '#F59E0B' },
  { name: 'Travel', value: 28, color: '#3B82F6' },
  { name: 'Shopping', value: 18, color: '#6B7280' },
  { name: 'Other', value: 12, color: '#4A4A4A' },
]

export const mockChatMessages = [
  {
    role: 'user',
    content: "What's important today?",
    timestamp: '12:30 PM',
  },
  {
    role: 'assistant',
    content: "You have 2 time-sensitive things today:\n\n1. Flight 6E 342 to Delhi at 18:45 from BLR Terminal 2. PNR: ABC123.\n2. Pushpa 2 at PVR Forum Mall at 21:00. Seats F4 and F5.\n\nAlso, your HDFC credit card bill of ₹8,240 is due tomorrow.",
    timestamp: '12:30 PM',
    usedInsights: ['1', '2', '3'],
  },
]

export const mockTimelineEvents = [
  {
    id: 't1',
    bucket: 'Today',
    time: '18:45',
    type: 'flight',
    title: 'IndiGo 6E 342 → Delhi',
    subtitle: 'BLR Terminal 2 · PNR: ABC123',
    detail: 'Departure in 6 hours. Check-in closes 45 min before.',
    countdown: 'in 6h',
    urgent: true,
    past: false,
  },
  {
    id: 't2',
    bucket: 'Today',
    time: '20:00',
    type: 'delivery',
    title: 'Amazon delivery',
    subtitle: 'Order #OD334455667',
    detail: 'Out for delivery. Expected before 8 PM.',
    countdown: 'arriving today',
    urgent: false,
    past: false,
  },
  {
    id: 't3',
    bucket: 'Today',
    time: '21:00',
    type: 'movie',
    title: 'Pushpa 2: The Rule',
    subtitle: 'PVR Forum Mall · Seats F4, F5',
    detail: 'Arrive 15 min early. Collect tickets at counter 3.',
    countdown: 'in 9h',
    urgent: false,
    past: false,
  },
  {
    id: 't4',
    bucket: 'Tomorrow',
    time: '23:59',
    type: 'finance',
    title: 'HDFC Card Bill due',
    subtitle: '₹8,240 · Account ending 4521',
    detail: 'Late payment attracts ₹500 fee + interest.',
    countdown: 'due tomorrow',
    urgent: true,
    past: false,
  },
  {
    id: 't5',
    bucket: 'Jan 20',
    time: '14:00',
    type: 'hotel',
    title: 'Taj Palace check-in',
    subtitle: 'New Delhi · Conf: TPD-2024-8821',
    detail: 'Standard check-in time. Early check-in available on request.',
    countdown: 'in 5 days',
    urgent: false,
    past: false,
  },
  {
    id: 't6',
    bucket: 'Yesterday',
    time: '09:00',
    type: 'finance',
    title: 'HDFC Statement received',
    subtitle: 'January 2024',
    detail: '',
    countdown: '',
    urgent: false,
    past: true,
  },
]
