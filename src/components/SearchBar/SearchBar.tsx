import React, { useState } from "react";
import { Input, Button, Drawer, Checkbox } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";

interface SearchFilters {
  title: boolean;
  description: boolean;
  tags: boolean;
}

interface SearchBarProps {
  onSearch: (searchText: string, filters: SearchFilters) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    title: true,
    description: true,
    tags: true,
  });
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Обработчик изменения текста поиска
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Обработчик клика на кнопку поиска
  const handleSearchClick = () => {
    // Если фильтры не выбраны, то искать по всем полям
    if (!filters.title && !filters.description && !filters.tags) {
      // В этом случае ищем по всем полям
      onSearch(searchText, { title: true, description: true, tags: true });
    } else {
      // Иначе ищем по выбранным фильтрам
      onSearch(searchText, filters);
    }
  };

  // Обработчик открытия Drawer (всплывающее окно с фильтрами)
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  // Обработчик закрытия Drawer
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  // Обработчик изменения фильтров
  const handleFilterChange = (filter: keyof SearchFilters) => {
    const updatedFilters = { ...filters, [filter]: !filters[filter] };
    setFilters(updatedFilters);
  };

  return (
    <div className="search-bar">
      {/* Поле ввода поиска */}
      <Input
        placeholder="Поиск..."
        value={searchText}
        onChange={handleSearchTextChange}
        style={{ width: 300, marginRight: 8 }}
      />

      {/* Кнопка поиска */}
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleSearchClick}
      >
        Поиск
      </Button>

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
        open={isDrawerVisible}
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
