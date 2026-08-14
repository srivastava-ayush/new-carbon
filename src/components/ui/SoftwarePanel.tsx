export default function SoftwarePanel() {
  const chrome = "rounded-full bg-black/10";
  return (
    <div className="relative h-auto overflow-hidden rounded-[10px] border border-[rgba(0,0,0,0.1)] bg-white">
      <div className="flex h-[480px] flex-col p-[24px] md:h-[640px]">
        <div className="flex items-center justify-between border-b border-black/10 pb-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="h-[10px] w-[10px] rounded-full bg-[#16a34a]" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#9e9e9e]" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#e2e8f0]" />
          </div>
          <span className="text-[12px] uppercase tracking-[0.1em] text-[#848484]">Aria Cloud</span>
        </div>

        <div className="mt-[24px] grid flex-1 grid-cols-3 gap-[12px]">
          <div className="col-span-1 flex flex-col gap-[10px]">
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#848484]">Signals</span>
            <div className={`h-[10px] w-full rounded-full ${chrome}`} />
            <div className={`h-[10px] w-4/5 rounded-full ${chrome}`} />
            <div className={`h-[10px] w-full rounded-full ${chrome}`} />
            <div className={`h-[10px] w-2/3 rounded-full ${chrome}`} />
            <div className={`h-[10px] w-5/6 rounded-full ${chrome}`} />
            <div className={`h-[10px] w-full rounded-full bg-[#16a34a]`} />
            <div className={`h-[10px] w-3/4 rounded-full ${chrome}`} />
          </div>

          <div className="col-span-2 flex flex-col gap-[12px]">
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#848484]">Agents</span>
            <div className="rounded-[8px] border border-black/10 p-[12px]">
              <div className="mb-[10px] h-[10px] w-1/2 rounded-full bg-[#16a34a]" />
              <div className={`h-[10px] w-full rounded-full ${chrome}`} />
              <div className={`mt-[6px] h-[10px] w-5/6 rounded-full ${chrome}`} />
            </div>
            <div className="rounded-[8px] border border-black/10 p-[12px]">
              <div className="mb-[10px] h-[10px] w-1/3 rounded-full bg-[#16a34a]" />
              <div className={`h-[10px] w-full rounded-full ${chrome}`} />
              <div className={`mt-[6px] h-[10px] w-2/3 rounded-full ${chrome}`} />
            </div>
            <div className="rounded-[8px] border border-black/10 p-[12px]">
              <div className="mb-[10px] h-[10px] w-2/3 rounded-full bg-[#16a34a]" />
              <div className={`h-[10px] w-full rounded-full ${chrome}`} />
              <div className={`mt-[6px] h-[10px] w-full rounded-full ${chrome}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}