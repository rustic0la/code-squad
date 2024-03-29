const SidebarItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <a
      href={href}
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      <span className="ms-3">{label}</span>
    </a>
  );
};

export const Sidebar = () => {
  return (
    <aside
      id="default-sidebar"
      className="fixed left-0 z-40 w-44 h-[calc(100vh-65px)] top-[65px] transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <SidebarItem href="/courses" label="Каталог" />
          </li>
          <li>
            <SidebarItem href="/" label="Дашборд" />
          </li>
          <li>
            <SidebarItem href="/" label="Избранное" />
          </li>
          <li>
            <SidebarItem href="/" label="Упражения" />
          </li>
          <li>
            <SidebarItem href="/" label="Подписка" />
          </li>
        </ul>
      </div>
    </aside>
  );
};
