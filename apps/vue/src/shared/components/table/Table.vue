<script setup lang="ts" generic="DATA extends Record<string, unknown>">
import {
  FlexRender,
  tableFeatures,
  useTable,
  columnSizingFeature,
  type ColumnDef,
  type Row_Core,
} from "@tanstack/vue-table";
import { computed } from "vue";

type ColumnMeta = {
  align?: "left" | "center" | "right";
};

const features = tableFeatures({
  columnSizingFeature,
  columnMeta: {} as ColumnMeta,
});

type Props = {
  tableKey: string;
  variant?: "flat" | "default";
  columns: Array<ColumnDef<typeof features, DATA>>;
  data: Array<DATA>;
};

type Emits = {
  onRowClick: [Row_Core<typeof features, DATA>];
};

defineEmits<Emits>();
const { variant = "default", columns, data, tableKey } = defineProps<Props>();

const table = useTable<typeof features, DATA>({
  key: tableKey,
  features,
  columns: computed(() => columns),
  data: computed(() => data),
});
</script>

<template>
  <table :class="['table', { [variant]: true }]">
    <colgroup>
      <col
        v-for="column in table.getAllLeafColumns()"
        :key="column.id"
        :style="
          column.columnDef.size !== undefined ? { width: `${column.getSize()}px` } : undefined
        "
      />
    </colgroup>

    <thead class="table-head">
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" class="head-row">
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          class="head-row-cell"
          :style="{ textAlign: header.column.columnDef.meta?.align ?? 'left' }"
        >
          <FlexRender v-if="!header.isPlaceholder" :header="header" />
        </th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr
        v-for="row in table.getRowModel().rows"
        :key="row.id"
        class="body-row"
        @click="$emit('onRowClick', row)"
      >
        <td
          v-for="cell in row.getAllCells()"
          :key="cell.id"
          class="body-row-cell"
          :style="{ textAlign: cell.column.columnDef.meta?.align ?? 'left' }"
        >
          <FlexRender :cell="cell" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.table {
  /* width: 100%; */
  table-layout: fixed;

  & > .table-head {
    & > .head-row > .head-row-cell {
      font-size: 12px;
      line-height: 16px;
      padding: 16px;

      &:first-child {
        padding-left: 20px;
      }

      &:last-child {
        padding-right: 20px;
      }
    }
  }

  & > .table-body {
    & > .body-row {
      cursor: pointer;

      & > .body-row-cell {
        font-size: 12px;
        line-height: 16px;
        height: 70px;
        vertical-align: middle;
        background-color: var(--color-white);
        padding: 0 16px;

        &:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          padding-left: 20px;
        }

        &:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          padding-right: 20px;
        }
      }

      &:hover {
        filter: drop-shadow(1px 17px 22px rgba(from var(--color-text) r g b / 7%));
      }
    }
  }

  &.default {
    border-collapse: separate;
    border-spacing: 0 10px;
  }

  &.flat {
    & > .table-head {
      & > .head-row {
        & > .head-row-cell {
          border-bottom: 1px solid rgba(from var(--color-text) r g b / 5%);
        }
      }
    }

    & > .table-body {
      & > .body-row {
        border-radius: 0;

        & > .body-row-cell {
          height: 55px;
          border-radius: 0;
          background: none;
        }

        &:hover {
          & > .body-row-cell {
            background-color: rgba(from var(--color-text) r g b / 5%);
          }
        }
      }
    }
  }
}
</style>
