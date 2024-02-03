import { ResponsiveLine } from '@nivo/line'

type Props = {
  data: any
  height: number
}

export default function StyleLineGraph({
  data,
  height
}: Props) {
  return (
    <div style={{ height: height }} className='w-full border-y-2 border-blue-500'>
      <ResponsiveLine
        data={data}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        axisBottom={{
          format: '%b %d',
          // legend: 'time scale',
          legendOffset: -12,
          tickValues: 'every 2 days'
        }}
        xScale={{
          format: '%Y-%m-%d',
          precision: 'day',
          type: 'time',
          useUTC: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        curve="monotoneX"
        enablePointLabel
        xFormat="time:%Y-%m-%d"
        axisRight={null}
        pointSize={12}
        // pointColor={{ theme: 'background' }}
        pointColor="#3b82f6"
        pointBorderWidth={2}
        colors="#3b82f6"
        // colors={}
        // pointBorderColor={{ from: 'seriesColor' }}
        pointBorderColor="#3b82f6"
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  )
}