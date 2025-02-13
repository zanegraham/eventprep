import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Plus } from 'lucide-react';
import type { Event, Item } from '../../types';
import ChecklistSection from './checklist/ChecklistSection';
import AddItemsModal from './checklist/AddItemsModal';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  onUpdateEvent: (updatedEvent: Event) => void;
  items: Item[];
}

export default function EventDetails({ event, onBack, onUpdateEvent, items }: EventDetailsProps) {
  const [isAddItemsModalOpen, setIsAddItemsModalOpen] = useState(false);

  const handleToggleItem = (itemId: string) => {
    const updatedChecklist = event.checklist.map(item => 
      item.itemId === itemId ? { ...item, completed: !item.completed } : item
    );
    onUpdateEvent({ ...event, checklist: updatedChecklist });
  };

  const handleAddItems = (selectedItemIds: string[]) => {
    const newItems = selectedItemIds
      .filter(id => !event.checklist.some(item => item.itemId === id))
      .map(id => ({ itemId: id, completed: false }));
    
    onUpdateEvent({
      ...event,
      checklist: [...event.checklist, ...newItems],
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Events
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{event.name}</h1>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
              {event.type}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>{formatTime(event.date)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Checklist</h2>
            <button
              onClick={() => setIsAddItemsModalOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Items
            </button>
          </div>
        </div>

        <ChecklistSection
          checklist={event.checklist}
          items={items}
          onToggleItem={handleToggleItem}
        />
      </div>

      <AddItemsModal
        isOpen={isAddItemsModalOpen}
        onClose={() => setIsAddItemsModalOpen(false)}
        onAdd={handleAddItems}
        items={items}
        existingItemIds={event.checklist.map(item => item.itemId)}
      />
    </div>
  );
}