import './styles.css';

const insertBefore = (referenceNode: Node, newNode: Node) => {
  if (!referenceNode.parentNode) return;
  referenceNode.parentNode.insertBefore(newNode, referenceNode);
};

const insertAfter = (referenceNode: Node, newNode: Node) => {
  if (!referenceNode.parentNode) return;
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

export interface DraggableItem {
  element: HTMLElement;
  index: number;
  top: number;
  height: number;
}

export interface DraggableListOptions {
  /** 长按触发时间（毫秒） */
  longPressDuration?: number;
  /** 列表容器选择器或元素 */
  container: HTMLElement | string;
  /** 列表项选择器 */
  itemSelector?: string;
  /** 拖动开始时的回调 */
  onDragStart?: (item: DraggableItem) => void;
  /** 拖动过程中的回调 */
  onDragMove?: (item: DraggableItem, currentIndex: number) => void;
  /** 拖动结束时的回调 */
  onDragEnd?: (startIndex: number, endIndex: number) => void;
  /** 是否启用触摸支持 */
  enableTouch?: boolean;
  /** 是否启用鼠标支持 */
  enableMouse?: boolean;
  /** 自定义拖动时的样式类名 */
  draggingClass?: string;
}

export interface DraggableListState {
  items: DraggableItem[];
  draggingItem: DraggableItem | null;
  startY: number;
  currentY: number;
  startIndex: number;
  currentIndex: number;
  isDragging: boolean;
}

export interface DraggableListReturn {
  /** 拖动状态 */
  state: DraggableListState;
  /** 初始化函数 */
  init: () => void;
  /** 销毁函数 */
  destroy: () => void;
}

type DragEvent = MouseEvent | TouchEvent;

/**
 * 创建一个可拖动的列表功能
 * @param options 配置选项
 * @returns DraggableListReturn
 */
export const useDraggableList = (options: DraggableListOptions): DraggableListReturn => {
  const {
    longPressDuration = 100,
    container,
    itemSelector = '.dl-item',
    onDragStart,
    onDragMove,
    onDragEnd,
    enableTouch = true,
    enableMouse = true,
    draggingClass = 'dl-dragging'
  } = options;

  const state: DraggableListState = {
    items: [],
    draggingItem: null,
    startY: 0,
    currentY: 0,
    startIndex: 0,
    currentIndex: 0,
    isDragging: false
  };

  let listContainer: HTMLElement | null = null;
  let longPressTimer: number | undefined;
  let startYPosition = 0;
  let initialOffset = 0;
  let animationFrameHandle: number | undefined;
  let startItemIndex: number | undefined;
  let endItemIndex: number | undefined;

  const startDragging = (item: HTMLElement, clientY: number) => {
    if (!listContainer) return;

    state.draggingItem = {
      element: item,
      index: Array.from(listContainer.querySelectorAll(itemSelector)).indexOf(item),
      top: item.getBoundingClientRect().top,
      height: item.getBoundingClientRect().height
    };
    state.isDragging = true;
    state.startIndex = state.draggingItem.index;
    state.currentIndex = state.draggingItem.index;

    // 处理排序
    const items = Array.from(listContainer.querySelectorAll(itemSelector));
    const currentIndex = items.indexOf(item);
    startItemIndex = currentIndex;
    if (endItemIndex === undefined) {
      endItemIndex = startItemIndex;
    }

    const itemRect = item.getBoundingClientRect();
    const containerRect = listContainer.getBoundingClientRect();

    item.classList.add(draggingClass);
    item.style.position = 'relative';
    item.style.zIndex = '1000';

    startYPosition = clientY;
    initialOffset = itemRect.top - containerRect.top;
    item.style.transform = 'translateY(0)';

    onDragStart?.(state.draggingItem);
  };

  const stopDragging = () => {
    if (!state.draggingItem || !listContainer) return;

    const items = Array.from(listContainer.querySelectorAll(itemSelector));
    state.draggingItem.element.addEventListener('transitionend', () => {
      items.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.transition = 'none';
          element.style.transform = '';
          requestAnimationFrame(()=> {
            requestAnimationFrame(() => {
              element.style.transition = '';
            });
          })
        }
      });
      const currentList = [...items].filter((element) => element !== state.draggingItem?.element);
      const draggedItem = state.draggingItem as DraggableItem;
      if (currentList[endItemIndex!]) {
        insertBefore(currentList[endItemIndex!], draggedItem.element);
      } else {
        insertAfter(currentList[endItemIndex! - 1], draggedItem.element);
      }

      if (startItemIndex !== endItemIndex && startItemIndex !== undefined && endItemIndex !== undefined) {
        onDragEnd?.(startItemIndex, endItemIndex);
      }

      draggedItem.element.style.position = '';
      draggedItem.element.style.zIndex = '';

      startItemIndex = undefined;
      endItemIndex = undefined;
      state.draggingItem = null;
      state.isDragging = false;
      state.startIndex = 0;
      state.currentIndex = 0;
    }, { once: true });

    state.draggingItem.element.classList.remove(draggingClass);

    const containerRect = listContainer.getBoundingClientRect();
    const draggedItem = state.draggingItem as DraggableItem;
    const moveTop = endItemIndex! * draggedItem.element.offsetHeight;
    const itemRect = draggedItem.element.getBoundingClientRect();
    const offsetTop = itemRect.top - containerRect.top;
    const moveDistance = moveTop - offsetTop;
    const styleTransform = getComputedStyle(draggedItem.element).transform;
    const currentY = styleTransform === 'none' ? 0 : parseFloat(styleTransform.split(',')[5]);
    draggedItem.element.style.transform = `translateY(${currentY + moveDistance}px)`;
  };

  const sortItems = (moveIndex: number, currentPlaceholderIndex: number) => {
    if (!listContainer || !state.draggingItem) return;

    const currentList = Array.from(listContainer.children).filter((element): element is HTMLElement => 
      element instanceof HTMLElement && 
      // element.classList.contains('list-item') &&
      element !== (state.draggingItem as DraggableItem).element
    );

    if (currentPlaceholderIndex === moveIndex) return;

    currentList.splice(moveIndex, 0, state.draggingItem.element);
    const containerRect = listContainer.getBoundingClientRect();
    currentList.forEach((element, index) => {
      const moveTop = index * state.draggingItem!.element.offsetHeight;
      const itemRect = element.getBoundingClientRect();
      const offsetTop = itemRect.top - containerRect.top;
      const moveDistance = moveTop - offsetTop;
      const styleTransform = getComputedStyle(element).transform;
      const currentY = styleTransform === 'none' ? 0 : parseFloat(styleTransform.split(',')[5]);
      element.style.transform = `translateY(${currentY + moveDistance}px)`;
    });
  };

  const moveItem = (clientY: number) => {
    if (!state.draggingItem || !listContainer) return;

    const deltaY = clientY - startYPosition;
    const draggedItemTop = initialOffset + deltaY;
    state.draggingItem.element.style.transform = `translateY(${deltaY}px)`;
    const draggedItemBottom = draggedItemTop + state.draggingItem.element.offsetHeight;
    const draggedItemMiddle = draggedItemTop / 2 + draggedItemBottom / 2;

    const items = Array.from(listContainer.querySelectorAll(itemSelector));
    let moveEndIndex = Math.trunc(draggedItemMiddle / state.draggingItem.element.offsetHeight);
    moveEndIndex = moveEndIndex >= 0 ? moveEndIndex : 0;
    moveEndIndex = moveEndIndex < items.length ? moveEndIndex : items.length - 1;

    if (moveEndIndex === endItemIndex) {
      return;
    }

    sortItems(moveEndIndex, endItemIndex!);
    endItemIndex = moveEndIndex;
    state.currentIndex = moveEndIndex;
    onDragMove?.(state.draggingItem, moveEndIndex);
  };

  const handleMouseDown = (e: DragEvent) => {
    e.preventDefault();
    const target = e.target instanceof Element ? e.target : null;
    const item = target?.closest(itemSelector);
    if (!item || !(item instanceof HTMLElement)) return;

    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;

    longPressTimer = window.setTimeout(() => {
      startDragging(item, clientY);
    }, longPressDuration);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!state.draggingItem) return;
    e.preventDefault();
    const clientY = e.clientY;
    if (animationFrameHandle) {
      cancelAnimationFrame(animationFrameHandle);
    }
    animationFrameHandle = requestAnimationFrame(() => {
      moveItem(clientY);
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!state.draggingItem) return;
    e.preventDefault();
    const clientY = e.touches[0].clientY;
    if (animationFrameHandle) {
      cancelAnimationFrame(animationFrameHandle);
    }
    animationFrameHandle = requestAnimationFrame(() => {
      moveItem(clientY);
    });
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = undefined;
    }
    stopDragging();
  };

  const onMounted = () => {
    listContainer = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!listContainer) return;

    if (enableMouse) {
      listContainer.addEventListener('mousedown', handleMouseDown);
      listContainer.addEventListener('mousemove', handleMouseMove);
      listContainer.addEventListener('mouseup', handleMouseUp);
      listContainer.addEventListener('mouseleave', handleMouseUp);
    }

    if (enableTouch) {
      listContainer.addEventListener('touchstart', handleMouseDown);
      listContainer.addEventListener('touchmove', handleTouchMove);
      listContainer.addEventListener('touchend', handleMouseUp);
    }
  };

  const onUnmounted = () => {
    if (!listContainer) return;

    if (enableMouse) {
      listContainer.removeEventListener('mousedown', handleMouseDown);
      listContainer.removeEventListener('mousemove', handleMouseMove);
      listContainer.removeEventListener('mouseup', handleMouseUp);
      listContainer.removeEventListener('mouseleave', handleMouseUp);
    }

    if (enableTouch) {
      listContainer.removeEventListener('touchstart', handleMouseDown);
      listContainer.removeEventListener('touchmove', handleTouchMove);
      listContainer.removeEventListener('touchend', handleMouseUp);
    }

    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = undefined;
    }

    if (animationFrameHandle) {
      cancelAnimationFrame(animationFrameHandle);
      animationFrameHandle = undefined;
    }
  };

  return {
    state,
    init: onMounted,
    destroy: onUnmounted
  };
};
