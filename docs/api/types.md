# 类型定义

## DraggableItem

表示一个可拖动的列表项。

```typescript
interface DraggableItem {
  /** 列表项元素 */
  element: HTMLElement;
  /** 列表项索引 */
  index: number;
}
```

## DraggableListOptions

配置选项接口。

```typescript
interface DraggableListOptions {
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
```

## DraggableListState

拖动状态接口。

```typescript
interface DraggableListState {
  /** 当前正在拖动的项 */
  draggedItem: DraggableItem | null;
  /** 是否正在拖动中 */
  isDragging: boolean;
  /** 拖动开始时的索引 */
  startIndex: number | null;
  /** 当前拖动到的索引 */
  currentIndex: number | null;
}
```

## DraggableListReturn

返回值接口。

```typescript
interface DraggableListReturn {
  /** 拖动状态 */
  state: DraggableListState;
  /** 初始化函数 */
  init: () => void;
  /** 销毁函数 */
  destroy: () => void;
}
```

## 使用示例

```typescript
import { useDraggableList } from '@drag-list/core'

// 定义配置选项
const options: DraggableListOptions = {
  container: '.dl-container',
  itemSelector: '.dl-item',
  onDragEnd: (startIndex, endIndex) => {
    console.log('拖动结束:', startIndex, endIndex)
  }
}

// 使用 hook
const { state, init, destroy }: DraggableListReturn = useDraggableList(options)

// 初始化
init()

// 组件卸载时销毁
destroy()
``` 