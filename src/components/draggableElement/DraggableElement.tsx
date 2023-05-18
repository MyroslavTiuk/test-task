import React, { useState } from 'react';
import './DraggableElement.css'
import Modal from '../modal/Modal';

interface Item {
  id: number;
  text: string;
  level: number;
}

interface SubItem {
  itemId: number;
  subItemId: number;
  text: string;
  level: number;
}

const DraggableElement: React.FC = () => {
  const [text, setText] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);
  const [nextSubItemId, setNextSubItemId] = useState(1);
  const [isSubEditing, setIsSubEditing] = useState(false);
  const [editingSubItemId, setEditingSubItemId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addItem = () => {
    if (text.trim() === '') {
      return;
    }

    const newItem: Item = {
      id: Date.now(),
      text: text,
      level: 0,
    };
    setItems((prevItems) => [...prevItems, newItem]);
    setText('');
    setIsAddingItem(false);
  };

  const deleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const saveItem = (id: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, text: text };
      }
      return item;
    });
    setItems(updatedItems);
    setText('');
    setIsEditing(false);
    setEditingItemId(null);
  };

  const editItem = (id: number) => {
    setIsEditing(true);
    setEditingItemId(id);
    const item = items.find((item) => item.id === id);
    if (item) {
      setText(item.text);
    }
  };

  const addSubItem = (itemId: number, itemLevel: number) => {

    const newItem: SubItem = {
      itemId: itemId,
      subItemId: nextSubItemId,
      text: '',
      level: itemLevel + 1,
    };
    setSubItems((prevSubItems) => [...prevSubItems, newItem]);
    setNextSubItemId((prevSubItemId) => prevSubItemId + 1);
    setIsAddingSubItem(true);
  };

  const saveSubItem = (subItemId: number) => {
    if (text.trim() === '') {
      return;
    }
    const updatedSubItems = subItems.map((subItem) => {
      if (subItem.subItemId === subItemId) {
        return { ...subItem, text: text };
      }
      return subItem;
    });
    setSubItems(updatedSubItems);
    setText('');
    setIsAddingSubItem(false);
    setIsSubEditing(false);
    setEditingSubItemId(null);
  };

  const deleteSubItem = (subItemId: number) => {
    setSubItems((prevSubItems) => prevSubItems.filter((subItem) => subItem.subItemId !== subItemId));
  };

  const editSubItem = (id: number) => {
    setIsSubEditing(true);
    setEditingSubItemId(id);
    const subItem = subItems.find((subItem) => subItem.subItemId === id);
    if (subItem) {
      setText(subItem.text);
    }
  };

  const showModal = (itemId: number, level: number) => {
    setModalVisible(true);
    addSubItem(itemId, level)
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    hideModal();
  };

  return (
    <div className="main-draggable-container">
      <div className="main-draggable-element">
        <div className="draggable-element-title">Categories</div>
        <div className="draggable-element-button" onClick={() => setIsAddingItem(true)}>
          <i className="fa-solid fa-plus fa-xs"></i>
        </div>
      </div>
      <div className="draggeble-elements">
        {items.map((item, index) => (
          <div key={item.id} className="main-draggable-element" style={{ marginLeft: index !== 0 ? '20px' : 0 }}>
            {isEditing && editingItemId === item.id ? (
              <>
                <input
                  type="text"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Category name"
                  maxLength={10}
                />
                <div className="draggable-element-button cancel" onClick={() => setIsEditing(false)}>
                  <i className="fa-sharp fa-solid fa-xmark"></i>
                </div>
                <div className="draggable-element-button save" onClick={() => saveItem(item.id)}>
                  <i className="fa-solid fa-check"></i>
                </div>
              </>
            ) : (
              <div className='draggable-sub-elements'>
                <div className="draggable-sub-element">
                  <div className="draggable-element-title saved-element">{item.text}</div>
                  <div className="draggable-element-button" onClick={() => showModal(item.id, item.level)}>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  <div className="draggable-element-button" onClick={() => editItem(item.id)}>
                    <i className="fa-solid fa-pen fa-xs"></i>
                  </div>
                  <div className="draggable-element-button delete" onClick={() => deleteItem(item.id)}>
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                  </div>
                </div>
                
                <div className='new-sub-elements'>
                {subItems.map((subItem) =>
                  subItem.itemId === item.id ? (
                    <div key={subItem.subItemId} className="main-draggable-element">
                      {isAddingSubItem && subItem.subItemId === nextSubItemId - 1 ? (
                        <>
                          <input
                            type="text"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            placeholder="Category name"
                            maxLength={10}
                          />
                          <div className="draggable-element-button cancel" onClick={() => setIsAddingSubItem(false)}>
                            <i className="fa-sharp fa-solid fa-xmark"></i>
                          </div>
                          <div className="draggable-element-button save" onClick={() => saveSubItem(subItem.subItemId)}>
                            <i className="fa-solid fa-check"></i>
                          </div>
                        </>
                      ) : (
                        <>
                          {isSubEditing && editingSubItemId === subItem.subItemId ? (
                            <>
                              <input
                                type="text"
                                value={text}
                                onChange={(event) => setText(event.target.value)}
                                placeholder="Category name"
                                maxLength={10}
                              />
                              <div className="draggable-element-button cancel" onClick={() => setIsSubEditing(false)}>
                                <i className="fa-sharp fa-solid fa-xmark"></i>
                              </div>
                              <div className="draggable-element-button save" onClick={() => saveSubItem(subItem.subItemId)}>
                                <i className="fa-solid fa-check"></i>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="draggable-element-title saved-sub-element">{subItem.text}</div>
                              <div className="draggable-element-button" onClick={() => {}}>
                                <i className="fa-solid fa-plus"></i>
                              </div>
                              <div className="draggable-element-button" onClick={() => editSubItem(subItem.subItemId)}>
                                <i className="fa-solid fa-pen fa-xs"></i>
                              </div>
                              <div className="draggable-element-button delete" onClick={() => deleteSubItem(subItem.subItemId)}>
                                <i className="fa-sharp fa-solid fa-xmark"></i>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ) : null
                )}
                </div>
              </div>
            )}
          </div>
        ))}
        {isAddingItem && (
          <div className='add-item'>
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Category name"
              maxLength={10}
            />
            {!isEditing ? (
              <>
                <div className="draggable-element-button cancel" onClick={() => setIsAddingItem(false)}>
                  <i className="fa-sharp fa-solid fa-xmark"></i>
                </div>
                <div className="draggable-element-button save" onClick={addItem}>
                  <i className="fa-solid fa-check"></i>
                </div>
              </>
            ) : (
              <>
                <div className="draggable-element-button cancel" onClick={() => setIsEditing(false)}>
                  <i className="fa-sharp fa-solid fa-xmark"></i>
                </div>
                <div className="draggable-element-button save" onClick={() => saveItem(editingItemId!)}>
                  <i className="fa-solid fa-check"></i>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Modal visible={modalVisible} onCancel={hideModal} onConfirm={handleConfirm} />
    </div>
  );
};

export default DraggableElement;