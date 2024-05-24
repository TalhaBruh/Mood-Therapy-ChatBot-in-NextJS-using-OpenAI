type SessionType = {
  id: number;
  sessionTime: number;
  session: string;
};

const sessions: SessionType[] = [
  {
    id: 1,
    sessionTime: 10,
    session: "10 mins",
  },
  {
    id: 2,
    sessionTime: 20,
    session: "20 mins",
  },
  {
    id: 3,
    sessionTime: 30,
    session: "30 mins",
  },
  {
    id: 4,
    sessionTime: 40,
    session: "40 mins",
  },
  {
    id: 5,
    sessionTime: 1,
    session: "1 mins",
  },
];

export default sessions;
