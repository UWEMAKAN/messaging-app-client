import { InputLabel, MenuItem, Select } from '@mui/material';
import styled from '@emotion/styled';
import { Durations } from '../../services/chat/interfaces';

const Row = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  duration: string;
  setDuration: Function;
}

const durations = {
  ONE_DAY: 'One day',
  TWO_DAYS: 'Two days',
  ONE_WEEK: 'One week',
  ONE_MONTH: 'One month',
  THREE_MONTHS: 'Three Months',
  ONE_YEAR: 'One year',
};

export const SelectDuration = ({ setDuration, duration }: Props) => (
  <Row>
    <InputLabel style={{ color: 'black', marginRight: 16 }} id="demo-simple-select-label">
      Duration
    </InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={duration}
      size="small"
      onChange={(e) => setDuration(e.target.value)}
    >
      <MenuItem defaultChecked value={Durations.ONE_DAY}>
        {durations.ONE_DAY}
      </MenuItem>
      <MenuItem value={Durations.TWO_DAYS}>{durations.TWO_DAYS}</MenuItem>
      <MenuItem value={Durations.ONE_WEEK}>{durations.ONE_WEEK}</MenuItem>
      <MenuItem value={Durations.ONE_MONTH}>{durations.ONE_MONTH}</MenuItem>
      <MenuItem value={Durations.THREE_MONTHS}>{durations.THREE_MONTHS}</MenuItem>
      <MenuItem value={Durations.ONE_YEAR}>{durations.ONE_YEAR}</MenuItem>
    </Select>
  </Row>
);
