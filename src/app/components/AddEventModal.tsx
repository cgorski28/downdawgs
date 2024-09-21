import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  Box,
} from '@chakra-ui/react';
import { EventDocument, EventType, EventTypeDisplay } from '@/models/Event';
import { useSession } from 'next-auth/react'; // Add this import

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  addEvent: (event: EventDocument) => void;
  currentYear: number;
  currentMonth: number;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  addEvent,
  currentYear,
  currentMonth,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [eventType, setEventType] = useState(EventType.Other);
  const [location, setLocation] = useState(''); // Add this line
  const { data: session } = useSession(); // Add this line

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Partial<EventDocument> = {
      title,
      description,
      eventDate: new Date(eventDate),
      startTime,
      duration: parseInt(duration),
      eventType,
      location, // Add this line
      username: session?.user?.name || 'Anonymous', // Update this line
    };
    addEvent(newEvent as EventDocument);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent borderRadius="lg" p={4}>
        <ModalHeader fontSize="2xl" fontWeight="bold">
          Add New Event
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  resize="vertical"
                />
              </FormControl>
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    min={`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </FormControl>
              </HStack>
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <Input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Event Type</FormLabel>
                  <Select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as EventType)}
                  >
                    {Object.entries(EventTypeDisplay).map(([type, display]) => (
                      <option key={type} value={type}>
                        {display}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>
              <Box pt={4}>
                <Button colorScheme="blue" type="submit" width="full">
                  Add Event
                </Button>
              </Box>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddEventModal;
