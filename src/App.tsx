import { useRef, useState } from "react";
import {
  PanInfo,
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";

type DrawerProps = {
  open: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
};

const DRAWER_ID = "drawer";

const Drawer = (props: DrawerProps) => {
  const { open, onDismiss, children } = props;

  const [scope, animate] = useAnimate();

  const contentRef = useRef<HTMLDivElement>(null);

  const controls = useDragControls();
  const y = useMotionValue(0);

  const handleOnDismiss = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    const height = contentRef.current?.offsetHeight || 0;

    await animate(`#${DRAWER_ID}`, {
      y: [yStart, height],
    });

    onDismiss();
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.velocity.y > 400 || info.offset.y > 200) {
      handleOnDismiss();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{duration: 0.2 }}
      onClick={handleOnDismiss}
      className="fixed overflow-hidden bottom-0 right-0 left-0 top-0 z-50 bg-neutral-950/70"
    >
      <motion.div
        id={DRAWER_ID}
        ref={contentRef}
        className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-2xl bg-neutral-900"
        //
        style={{ y }}
        //
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        //
        drag="y"
        dragListener={false}
        dragControls={controls}
        dragConstraints={{ top: 0.1, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={onDragEnd}
      >
        <div className="flex z-10 justify-center p-4 h-4 bg-neutral-900">
          <button
            title="Close"
            onPointerDown={(e) => controls.start(e)}
            className="h-1.5 w-10 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
          />
        </div>
        <>{children}</>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [open, setOpen] = useState(false);

  const onDismiss = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <div className="grid h-screen place-content-center bg-neutral-950">
      <button
        onClick={onOpen}
        className="rounded-full bg-indigo-700 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
      >
        Open Modal
      </button>

      <Drawer open={open} onDismiss={onDismiss}>
        <div className="overflow-y-auto relative h-full z-0 mx-auto max-w-5xl space-y-4 p-4 text-neutral-400">
          <h1 className="text-2xl font-bold">Bottom Sheet</h1>
          <p className="text-neutral-400 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tincidunt, nunc sit amet tempor aliquet, justo odio suscipit libero,
            nec ultricies nunc ligula ut eros. Nullam nec odio pharetra,
            ultricies purus in, euismod orci.
          </p>

          <p className="text-neutral-400 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tincidunt, nunc sit amet tempor aliquet, justo odio suscipit libero,
            nec ultricies nunc ligula ut eros. Nullam nec odio pharetra,
            ultricies purus in, euismod orci.
          </p>

          <p className="text-neutral-400 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tincidunt, nunc sit amet tempor aliquet, justo odio suscipit libero,
            nec ultricies nunc ligula ut eros. Nullam nec odio pharetra,
            ultricies purus in, euismod orci.
          </p>

          <p className="text-neutral-400 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tincidunt, nunc sit amet tempor aliquet, justo odio suscipit libero,
            nec ultricies nunc ligula ut eros. Nullam nec odio pharetra,
            ultricies purus in, euismod orci.
          </p>

          <p className="text-neutral-400 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tincidunt, nunc sit amet tempor aliquet, justo odio suscipit libero,
            nec ultricies nunc ligula ut eros. Nullam nec odio pharetra,
            ultricies purus in, euismod orci.
          </p>

          <p className="text-neutral-400 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tincidunt, nunc sit amet tempor aliquet, justo odio suscipit libero,
            nec ultricies nunc ligula ut eros. Nullam nec odio pharetra,
            ultricies purus in, euismod orci.
          </p>

          <p className="text-neutral-400 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tincidunt, nunc sit amet tempor aliquet, justo odio suscipit libero,
            nec ultricies nunc ligula ut eros. Nullam nec odio pharetra,
            ultricies purus in, euismod orci.
          </p>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
