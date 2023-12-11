import { formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ date }) => {
  const formattedTime = formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });

  return <span>{formattedTime}</span>;
};

export default TimeAgo;
