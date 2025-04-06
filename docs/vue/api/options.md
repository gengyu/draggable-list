# 配置选项

## DraggableListOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| container | `HTMLElement \| string` | - | 列表容器选择器或元素 |
| itemSelector | `string` | `'.dl-item'` | 列表项选择器 |
| longPressDuration | `number` | `100` | 长按触发时间（毫秒） |
| enableTouch | `boolean` | `true` | 是否启用触摸支持 |
| enableMouse | `boolean` | `true` | 是否启用鼠标支持 |
| draggingClass | `string` | `'dl-dragging'` | 拖动时的样式类名 |
| onDragStart | `(item: DraggableItem) => void` | - | 拖动开始时的回调 |
| onDragMove | `(item: DraggableItem, currentIndex: number) => void` | - | 拖动过程中的回调 |
| onDragEnd | `(startIndex: number, endIndex: number) => void` | - | 拖动结束时的回调 |

## DraggableItem

| 参数 | 类型 | 说明 |
|------|------|------|
| element | `HTMLElement` | 列表项元素 |
| index | `number` | 列表项索引 |

## DraggableListState

| 参数 | 类型 | 说明 |
|------|------|------|
| draggedItem | `DraggableItem \| null` | 当前正在拖动的项 |
| isDragging | `boolean` | 是否正在拖动中 |
| startIndex | `number \| null` | 拖动开始时的索引 |
| currentIndex | `number \| null` | 当前拖动到的索引 |

## DraggableListReturn

| 参数 | 类型 | 说明 |
|------|------|------|
| state | `DraggableListState` | 拖动状态 |
| init | `() => void` | 初始化函数 |
| destroy | `() => void` | 销毁函数 