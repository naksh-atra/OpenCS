import { useState, useEffect } from 'react';

interface TopicProgressProps {
  topicSlug: string;
}

export default function TopicProgress({ topicSlug }: TopicProgressProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    try {
      const visited = JSON.parse(localStorage.getItem('opencs_visited') || '[]');
      setCompleted(visited.includes(topicSlug));
    } catch (e) {}
  }, [topicSlug]);

  const toggle = () => {
    try {
      const visited = JSON.parse(localStorage.getItem('opencs_visited') || '[]');
      let updated;
      if (visited.includes(topicSlug)) {
        updated = visited.filter((s: string) => s !== topicSlug);
      } else {
        updated = [...visited, topicSlug];
      }
      localStorage.setItem('opencs_visited', JSON.stringify(updated));
      setCompleted(updated.includes(topicSlug));
    } catch (e) {}
  };

  return (
    <button
      className={`topic-progress-btn ${completed ? 'completed' : ''}`}
      onClick={toggle}
      title={completed ? 'Mark as not done' : 'Mark as done'}
      aria-label={completed ? 'Completed' : 'Mark as completed'}
    >
      {completed ? '✓' : '○'}
    </button>
  );
}
