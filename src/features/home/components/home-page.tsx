import { Filters } from './filters';

export function HomePage() {
  return (
    <div className="flex flex-col items-stretch gap-6 lg:flex-row">
      <aside className="shrink-0 space-y-4 lg:w-[256px]">
        <Filters />
      </aside>
      <div className="grow space-y-6">products</div>
    </div>
  );
}
