import { Range, getTrackBackground } from "react-range";

const SeekBar = ({ seek, duration, onChange, step }) => {
  return (
    <Range
      values={[seek]}
      step={step}
      min={0}
      max={duration}
      onChange={(values) => onChange(values[0])}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          className="h-[3px] w-full rounded-sm"
          style={{
            ...props.style,
          }}
        >
          <div
            ref={props.ref}
            className="h-[3px] w-full rounded-sm opacity-100"
            style={{
              background: getTrackBackground({
                values: seek,
                colors: ["white", "gray"],
                min: 0,
                max: duration,
              }),
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          className="flex items-center justify-center rounded-full"
          style={{
            ...props.style,
          }}
        >
          <div
            className={`rounded-full bg-white ${
              isDragged && `h-[10px] w-[10px]`
            }`}
          />
        </div>
      )}
    />
  );
};

export default SeekBar;
