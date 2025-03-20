import React, { useState } from "react";
import { Button, Drawer, Checkbox } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Task } from "../../shared/types/task.ts";
import Search from "antd/es/input/Search";

interface SearchFilters {
  title: boolean;
  description: boolean;
  tags: boolean;
}

interface SearchBarProps {
  tasks: Task[];
  setFilteredTasks: (filteredTasks: Task[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  tasks,
  setFilteredTasks,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filters, setFilters] = useState<SearchFilters>({
    title: true,
    description: true,
    tags: true,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Обработчик изменения текста поиска
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (
    searchText: string,
    filters: { title: boolean; description: boolean; tags: boolean },
  ) => {
    if (!searchText.trim()) {
      setFilteredTasks(tasks);
      return;
    }

    const lowerCaseSearch = searchText.toLowerCase();
    const results = tasks.filter(
      (task) =>
        (filters.title && task.title.toLowerCase().includes(lowerCaseSearch)) ||
        (filters.description &&
          task.description.toLowerCase().includes(lowerCaseSearch)) ||
        (filters.tags &&
          task.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearch))),
    );

    setFilteredTasks(results);
  };

  // Обработчик клика на кнопку поиска
  const handleSearchClick = () => {
    // Если фильтры не выбраны, то искать по всем полям
    if (!filters.title && !filters.description && !filters.tags) {
      // В этом случае ищем по всем полям
      handleSearch(searchText, { title: true, description: true, tags: true });
    } else {
      // Иначе ищем по выбранным фильтрам
      handleSearch(searchText, filters);
    }
  };

  // Обработчик открытия Drawer (всплывающее окно с фильтрами)
  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Обработчик закрытия Drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Обработчик изменения фильтров
  const handleFilterChange = (filter: keyof SearchFilters) => {
    const updatedFilters = { ...filters, [filter]: !filters[filter] };
    setFilters(updatedFilters);
  };

  const handleClearInput = () => {
    setSearchText("");
    setFilteredTasks(tasks);
  };

  return (
    <div>
      {/* Поле ввода поиска */}
      <Search
        placeholder="Поиск..."
        allowClear
        onClear={handleClearInput}
        enterButton
        value={searchText}
        onChange={handleSearchTextChange}
        onSearch={handleSearchClick}
        style={{ width: 200 }}
      />

      {/* Кнопка настроек */}
      <Button
        icon={<SettingOutlined />}
        onClick={showDrawer}
        style={{ marginLeft: 8 }}
      />

      {/* Всплывающее окно с фильтрами */}
      <Drawer
        title="Настройки фильтрации"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
        width={200}
      >
        <Checkbox
          checked={filters.title}
          onChange={() => handleFilterChange("title")}
        >
          Заголовок
        </Checkbox>
        <br />
        <Checkbox
          checked={filters.description}
          onChange={() => handleFilterChange("description")}
        >
          Описание
        </Checkbox>
        <br />
        <Checkbox
          checked={filters.tags}
          onChange={() => handleFilterChange("tags")}
        >
          Теги
        </Checkbox>
      </Drawer>
    </div>
  );
};
