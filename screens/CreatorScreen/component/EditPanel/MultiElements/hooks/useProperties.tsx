import React, { useState } from 'react';

interface Coords {
  orientation: string;
  Margin: number;
}

const useProperties = (coords: Coords) => {
  const [properties] = useState({
    orientation: coords.orientation,
    Margin: coords.Margin,
  });

  return { properties };
};

export default useProperties;



