# Exercise 2: Cluster and name

Work in pairs, 45 minutes.

## The study

The same eight patients: four **protected**, four **infection-prone**. Hypothesis fixed before the study: **CD8+ MAIT cells are less frequent in infection-prone patients.** This time you let the algorithm find the cell populations.

## Files

Download **Concatenated reference** (8 samples × 5,000 cells) and **Cross-check file**. Both are single FCS files; there is nothing to unzip. The cross-check file has no measurement-day alignment. Use it in step 9. Both files carry the extra parameters `SampleID` (1 to 8), `GroupID` (1 = protected, 2 = infection-prone) and `BatchDay` (1 or 2). These are parameters, not keywords.

## Steps

::: v10
These steps use FlowJo v10.10 with the FlowSOM plugin. On Windows, also have the UMAP plugin available.
:::

::: v11
These steps use FlowJo v11.2 or later, with built-in FlowSOM, UMAP and Cluster Explorer. In FlowJo 11 the markers are listed under the parameter set **Uncompensated**. This is expected: the files are already unmixed.
:::

1. **Load the reference file.**

::: v10
Click **FlowJo → Add Samples** and select the reference FCS. Double-click the sample to open its **Graph Window**.
:::

::: v11
Start a new workbench (**File → New Workbench**, then **File → Save Workbench As**) and drag the reference FCS file into it. You should see 40,000 events.
:::

2. **Set all fluorescence axes to biexponential before you gate or cluster.** Depending on the version, FlowJo shows them as Linear or Log after loading. Linear squeezes dim populations against zero; Log hides negative values.

::: v10
In the **Graph Window**, click **T** beside a fluorescence axis and select **Customize Axis**. Under **Scale**, choose the biexponential scale, then click **Apply** to update the workspace. Repeat for each fluorescence parameter and check the scale in all samples.
:::

::: v11
Click **T** beside an axis. In the panel on the right, open **Choose the parameters for this transformation** and tick the twelve markers and Live-Dead. The box at the top ticks all parameters, so untick FSC, SSC, **Event #**, **Time**, `SampleID`, `GroupID` and `BatchDay` again. Choose **Biex** and click **Apply**.
:::

3. **Choose the inputs.** Use the same twelve cell markers for FlowSOM and for the map. Leave out Time, FSC, SSC, Live-Dead, `SampleID`, `GroupID`, and `BatchDay`. Use the full reference population for both runs.
4. **Draw the map and cluster.** Use **20 metaclusters**.

::: v10
Select the reference sample in the Workspace. Choose **Workspace → Plugins → FlowSOM**, select the marker inputs and request **20 metaclusters**. Run the plugin. Reselect the same parent sample. On **Windows**, choose **Workspace → Plugins → UMAP**. On **Mac**, choose **Workspace → Populations → tSNE**. Use the same marker inputs for a two-dimensional map. Record any seeds shown in the dialogs.
:::

::: v11
Select **Ungated**. Choose **Platforms → UMAP**, choose the parameter set **Uncompensated** (with **Compensated** the list stays empty), tick the twelve markers, keep **Number of components** at **2** and the other defaults, and click **Submit**. Select **Ungated** again and choose **Platforms → FlowSOM**. Choose **Uncompensated** and untick Live-Dead, `SampleID`, `GroupID` and `BatchDay`; the list should read "APC-A :: CCR7 + 11 more". Set **Number of metaclusters** to **20** (default 10) and **Choose a downsampling method** to **None**, then click **Submit**. With these settings a second run gives the same clusters. The clusters appear as populations under **Ungated**. If FlowJo marks a run as out-of-date, its clusters stay usable. Right-click it → **Recalculate** runs FlowSOM again.
:::

5. **Name three to five clusters.** Look up which markers identify MAIT cells. Use the marker heatmap to choose the best-matching cluster and explain which marker pattern supports your choice.

::: v10
Select the parent of the FlowSOM clusters and click **Workspace → Cluster Explorer**. Select the FlowSOM result, the marker inputs and the UMAP or tSNE axes for your map, then click **Accept**. Read the cluster rows in the heatmap.
:::

::: v11
Select **Ungated** in **Populations**, then click **Cluster Explorer** in the navigation bar. If the expression panel shows N/A, set **Expression Plots Settings → Choose a parameter set** to **Uncompensated**. Tick the twelve markers under **Choose parameters**, then enlarge the lower panel (icon at its top right) to see the heatmap. Each row is a cluster. To see one cluster alone, select its population in **Populations**. To show the clusters on the map, set **Overlay Graph Settings → Plot Type** to **Dot Plot** and choose the two UMAP parameters as **X Axis** and **Y Axis**. The Cluster Explorer shows all child populations of **Ungated**: after two FlowSOM runs you see all clusters together. Type the run's name into **Filter clusters**, for example `FlowSOM_Ungated_cluster` for the first run and `FlowSOM_Ungated_1_cluster` for the second. The histogram FlowJo shows right after FlowSOM has overlapping labels; read the clusters in the Cluster Explorer.
:::

6. **Answer the study question.** Calculate one MAIT-cluster percentage per sample. Each sample contributes exactly 5,000 events, so the share of a sample is its number of events in the candidate cluster divided by 5,000, times 100. Record each sample's `GroupID` alongside its percentage.

::: v10
Double-click the MAIT candidate cluster to open its **Graph Window** and plot a histogram of `SampleID`. Draw eight range gates, one centred on each ID from 1 to 8, including any ID with no peak. In the Workspace, select the eight gates and drag them onto the cluster's parent population to copy them. In **FlowJo → Table Editor**, use **Edit → Add Column → Statistic** to put the **Count** for each cluster gate beside the **Count** for the matching parent gate. For each sample, divide the cluster-gate count by the parent-gate count and multiply by 100.
:::

::: v11
In **Graphs**, select the candidate cluster, choose **Histogram** in the plot settings and put `SampleID` on the x-axis. Draw a range gate around each of the eight peaks. The percentages on the range gates are shares of the cluster, not of the sample. Drag the eight gates into **Tables** and set the statistic to **Count** under **Settings**; you get one row with eight count columns. FlowJo cannot run the rank test here, because all samples sit in one file: use the counting rule.
:::

   Compare the eight sample percentages with the counting rule from Exercise 1 (a two-sided Wilcoxon rank-sum test). With no ties and all four values in one group above all four in the other, the exact p-value is 0.029.

7. **Check how stable your result is.** Run FlowSOM again with the same inputs. Use a different seed if there is a seed setting. Open the new result in Cluster Explorer and find the matching cluster by its marker pattern. Does its group difference persist?

::: v11
Run FlowSOM again on **Ungated** with the same inputs, but set **Choose a downsampling method** to **Random** and tick **Use random seed**. In the Cluster Explorer, type `FlowSOM_Ungated_1_cluster` into **Filter clusters** to see only the new run. If no cluster in the new run shows the MAIT pattern, note that too: it is part of the answer.
:::

8. **Other differences?** Compare the other clusters between the groups. Anything you find here is a hypothesis, not a result: you tested twenty clusters. With a rank test and four against four samples, no finding survives a correction for multiple testing (FDR). And a correction removes chance findings, not artefacts.
9. **Cross-check.** Open the **Cross-check file** in a separate workspace (FlowJo 11: workbench) or group and repeat steps 2–6 on that file. Plot a histogram of `BatchDay` and gate values 1 and 2. Compare those two populations on the cross-check map. What changes, and what stays the same?

::: v10
Select the cross-check parent and open **Workspace → Cluster Explorer**. Enable **Show Populations as a new Cluster set**, click **Configure**, and choose the two measurement-day gates. Select the UMAP or tSNE axes for your cross-check map and click **Accept**.
:::

::: v11
Name the two day gates `BatchDay 1` and `BatchDay 2`. Select their parent and open **Cluster Explorer**. Type `BatchDay` in **Filter clusters** and choose the cross-check UMAP axes in **Overlay Graph Settings**.
:::

## If you have time

Change the number of metaclusters to 12 and to 30. With how many does the MAIT cluster keep its own cluster? Run FlowSOM with **Random** downsampling and **Use random seed** several times: does the MAIT cluster always appear?
