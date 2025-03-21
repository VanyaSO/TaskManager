import React, { useState, useEffect, useCallback } from "react";
import { Modal, Input, Select, Row, Col } from "antd";

export type CardStyleSettings = {
  backgroundColor: string;
  padding: string;
  borderRadius: string;
  titleFontSize: string;
  descriptionFontSize: string;
  tagColor: string;
};

type CardSettingsProps = {
  visible: boolean;
  onClose: () => void;
  onSettingsChange: (newSettings: CardStyleSettings) => void;
  currentSettings: CardStyleSettings;
};

export function CardSettings({
  visible,
  onClose,
  onSettingsChange,
  currentSettings,
}: CardSettingsProps) {
  const [cardSettings, setCardSettings] =
    useState<CardStyleSettings>(currentSettings);

  // Мемоизированный обработчик изменения настроек
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement> | { value: string },
      name: string,
    ) => {
      const newValue = "value" in e ? e.value : e.target.value;
      setCardSettings((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    },
    [],
  );

  // Сохраняем настройки, когда они изменяются
  useEffect(() => {
    onSettingsChange(cardSettings);
  }, [cardSettings, onSettingsChange]);

  return (
    <Modal
      title="Настройки карточки"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <label>
              Фон карточки:
              <Input
                type="color"
                name="backgroundColor"
                value={cardSettings.backgroundColor}
                onChange={(e) => handleChange(e, "backgroundColor")}
              />
            </label>
          </Col>

          <Col span={24}>
            <label>
              Отступы:
              <Select
                value={cardSettings.padding}
                onChange={(value) => handleChange({ value }, "padding")}
              >
                <Select.Option value="10px">10px</Select.Option>
                <Select.Option value="15px">15px</Select.Option>
                <Select.Option value="20px">20px</Select.Option>
                <Select.Option value="25px">25px</Select.Option>
                <Select.Option value="30px">30px</Select.Option>
              </Select>
            </label>
          </Col>

          <Col span={24}>
            <label>
              Радиус углов:
              <Select
                value={cardSettings.borderRadius}
                onChange={(value) => handleChange({ value }, "borderRadius")}
              >
                <Select.Option value="5px">5px</Select.Option>
                <Select.Option value="10px">10px</Select.Option>
                <Select.Option value="15px">15px</Select.Option>
                <Select.Option value="20px">20px</Select.Option>
                <Select.Option value="25px">25px</Select.Option>
              </Select>
            </label>
          </Col>

          <Col span={24}>
            <label>
              Размер заголовка:
              <Select
                value={cardSettings.titleFontSize}
                onChange={(value) => handleChange({ value }, "titleFontSize")}
              >
                <Select.Option value="12px">12px</Select.Option>
                <Select.Option value="14px">14px</Select.Option>
                <Select.Option value="16px">16px</Select.Option>
                <Select.Option value="18px">18px</Select.Option>
                <Select.Option value="20px">20px</Select.Option>
              </Select>
            </label>
          </Col>

          <Col span={24}>
            <label>
              Размер описания:
              <Select
                value={cardSettings.descriptionFontSize}
                onChange={(value) =>
                  handleChange({ value }, "descriptionFontSize")
                }
              >
                <Select.Option value="12px">12px</Select.Option>
                <Select.Option value="14px">14px</Select.Option>
                <Select.Option value="16px">16px</Select.Option>
                <Select.Option value="18px">18px</Select.Option>
                <Select.Option value="20px">20px</Select.Option>
              </Select>
            </label>
          </Col>

          <Col span={24}>
            <label>
              Цвет тегов:
              <Input
                type="color"
                name="tagColor"
                value={cardSettings.tagColor}
                onChange={(e) => handleChange(e, "tagColor")}
              />
            </label>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
