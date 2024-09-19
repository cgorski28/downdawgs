import React from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';

interface Event {
  date: Date;
  title: string;
  description?: string;
  time: string;
  location: string;
  color: string; // Add this new property
}

const Calendar: React.FC = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Sample event
  const events: Event[] = [
    {
      date: new Date(currentYear, 8, 22), // September 22nd (month is 0-indexed)
      title: 'VinHausa Flow',
      description: 'Taught by Colton',
      time: '18:00 - 19:30',
      location: 'Millennium Park',
      color: 'teal.100', // Green color for VinHausa
    },
    {
      date: new Date(currentYear, 8, 18), // September 18th
      title: "Men's Club",
      time: '19:00 - 20:30',
      location: 'Community Center',
      color: 'purple.100', // Light purple color for Men's Club
    },
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getEventForDate = (day: number) => {
    return events.find(
      (event) =>
        event.date.getFullYear() === currentYear &&
        event.date.getMonth() === currentMonth &&
        event.date.getDate() === day
    );
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {new Date(currentYear, currentMonth).toLocaleString('default', {
          month: 'long',
        })}{' '}
        {currentYear}
      </Text>
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {daysOfWeek.map((day) => (
          <Box key={day} textAlign="center" fontWeight="bold">
            {day}
          </Box>
        ))}
        {blanks.map((_, index) => (
          <Box key={`blank-${index}`} />
        ))}
        {days.map((day) => {
          const event = getEventForDate(day);
          return (
            <Box
              key={day}
              height="80px"
              position="relative"
              style={{ perspective: '1000px' }}
            >
              <Box
                position="absolute"
                width="100%"
                height="100%"
                style={{ transformStyle: 'preserve-3d' }}
                transition="transform 0.6s"
                _hover={event ? { transform: 'rotateY(180deg)' } : {}}
              >
                <Box
                  position="absolute"
                  width="100%"
                  height="100%"
                  style={{ backfaceVisibility: 'hidden' }}
                  borderWidth={1}
                  borderRadius="md"
                  p={2}
                  bg={event ? event.color : 'transparent'}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Text color="gray.800">{day}</Text>
                  {event && (
                    <Text fontSize="xs" fontWeight="bold" color="gray.800">
                      {event.title}
                    </Text>
                  )}
                </Box>
                {event && (
                  <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    style={{ backfaceVisibility: 'hidden' }}
                    borderWidth={1}
                    borderRadius="md"
                    p={2}
                    bg={event.color}
                    transform="rotateY(180deg)"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                  >
                    <Text fontSize="sm" fontWeight="bold">
                      {event.title}
                    </Text>
                    <Text fontSize="xs">{event.time}</Text>
                    <Text fontSize="xs">{event.location}</Text>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Calendar;
