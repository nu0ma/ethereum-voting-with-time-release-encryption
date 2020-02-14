import React, { useEffect, FC } from 'react';
import { Segment } from 'semantic-ui-react';

type VoteListProps = {
  result: string[];
};

const VoteList: FC<VoteListProps> = ({ result }) => {
  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div>
      <ul>
        {result.map((res, index) => (
          <Segment key={index}>{res}</Segment>
        ))}
      </ul>
    </div>
  );
};

export default VoteList;
