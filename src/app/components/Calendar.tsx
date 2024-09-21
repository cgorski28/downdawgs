import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Text,
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { EventDocument, EventType, EventTypeDisplay } from '@/models/Event';
import AddEventModal from './AddEventModal'; // New import

interface CalendarProps {
  events: EventDocument[];
  addEvent: (event: EventDocument) => void;
  fetchEvents: (year: number, month: number) => void;
  isSignedIn: boolean; // New prop
}

const eventTypeColors: Record<EventType, string> = {
  [EventType.StudioThree]: 'blue.200',
  [EventType.MensClub]: 'green.200',
  [EventType.Vinhausa]: 'purple.200',
  [EventType.Other]: 'gray.200', // Add this line
};

const Calendar: React.FC<CalendarProps> = ({
  events,
  addEvent,
  fetchEvents,
  isSignedIn,
}) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [eventMap, setEventMap] = useState<Record<string, EventDocument>>({});
  const [selectedEvent, setSelectedEvent] = useState<EventDocument | null>(
    null
  );

  const {
    isOpen: isAddEventOpen,
    onOpen: onAddEventOpen,
    onClose: onAddEventClose,
  } = useDisclosure();
  const {
    isOpen: isEventDetailsOpen,
    onOpen: onEventDetailsOpen,
    onClose: onEventDetailsClose,
  } = useDisclosure();

  useEffect(() => {
    fetchEvents(currentYear, currentMonth + 1);
  }, [currentMonth, currentYear, fetchEvents]);

  useEffect(() => {
    const newEventMap: Record<string, EventDocument> = {};
    events.forEach((event) => {
      const dateKey = new Date(event.eventDate).toISOString().split('T')[0];
      newEventMap[dateKey] = event;
    });
    setEventMap(newEventMap);
  }, [events]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

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

  const formatEventTime = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const start = new Date(0, 0, 0, hours, minutes);
    const end = new Date(start.getTime() + duration * 60000);
    return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const handleDayClick = (event: EventDocument | undefined) => {
    if (event) {
      setSelectedEvent(event);
      onEventDetailsOpen();
    }
  };

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      p={{ base: 2, md: 6 }}
      maxWidth="100%"
      overflow="hidden"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: 2, md: 6 }}
      >
        <Text fontSize={{ base: 'sm', md: '2xl' }} fontWeight="bold">
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
          })}{' '}
          {currentYear}
        </Text>
        {isSignedIn && (
          <Button size={{ base: 'xs', md: 'md' }} onClick={onAddEventOpen}>
            Add
          </Button>
        )}
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: 2, md: 6 }}
      >
        <Button size={{ base: 'xs', md: 'md' }} onClick={goToPreviousMonth}>
          &lt;
        </Button>
        <Button size={{ base: 'xs', md: 'md' }} onClick={goToNextMonth}>
          &gt;
        </Button>
      </Flex>
      <Grid templateColumns="repeat(7, 1fr)" gap={{ base: 0.5, md: 3 }}>
        {daysOfWeek.map((day) => (
          <Box
            key={day}
            textAlign="center"
            fontWeight="bold"
            fontSize={{ base: '2xs', md: 'md' }}
          >
            {day.slice(0, 3)}
          </Box>
        ))}
        {blanks.map((_, index) => (
          <Box key={`blank-${index}`} />
        ))}
        {days.map((day) => {
          const dateKey = new Date(currentYear, currentMonth, day)
            .toISOString()
            .split('T')[0];
          const event = eventMap[dateKey];
          const backgroundColor = event
            ? eventTypeColors[event.eventType]
            : 'transparent';

          return (
            <Box
              key={`day-${day}`}
              borderWidth={1}
              p={{ base: 0.5, md: 3 }}
              aspectRatio={1}
              backgroundColor={backgroundColor}
              borderRadius={{ base: 'sm', md: 'md' }}
              onClick={() => handleDayClick(event)}
              cursor={event ? 'pointer' : 'default'}
              position="relative"
            >
              <Text
                position="absolute"
                top={{ base: 0.5, md: 2 }}
                left={{ base: 0.5, md: 2 }}
                fontSize={{ base: '2xs', md: 'lg' }}
                fontWeight="normal"
              >
                {day}
              </Text>
            </Box>
          );
        })}
      </Grid>

      {/* Color key */}
      <Flex flexWrap="wrap" justifyContent="center" mt={{ base: 4, md: 6 }}>
        {Object.entries(eventTypeColors).map(([type, color]) => (
          <Flex key={type} alignItems="center" mr={4} mb={2}>
            <Box
              width="20px"
              height="20px"
              backgroundColor={color}
              borderRadius="sm"
              mr={2}
            />
            <Text fontSize={{ base: 'xs', md: 'sm' }}>
              {EventTypeDisplay[type as EventType]}
            </Text>
          </Flex>
        ))}
      </Flex>

      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={onAddEventClose}
        addEvent={addEvent}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />
      <Modal isOpen={isEventDetailsOpen} onClose={onEventDetailsClose}>
        <ModalOverlay />
        <ModalContent mx={{ base: 4, md: 0 }}>
          <ModalHeader>{selectedEvent?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedEvent && (
              <>
                <Text mb={2}>
                  <strong>Date:</strong>{' '}
                  {new Date(selectedEvent.eventDate).toLocaleDateString()}
                </Text>
                <Text mb={2}>
                  <strong>Location:</strong> {selectedEvent.location}
                </Text>
                <Text mb={2}>
                  <strong>Time:</strong>{' '}
                  {formatEventTime(
                    selectedEvent.startTime,
                    selectedEvent.duration
                  )}
                </Text>
                <Text mb={2}>
                  <strong>Event Type:</strong>{' '}
                  {EventTypeDisplay[selectedEvent.eventType as EventType]}
                </Text>
                <Text mb={2}>
                  <strong>Description:</strong> {selectedEvent.description}
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Calendar;
